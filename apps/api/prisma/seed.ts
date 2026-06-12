import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { createPrismaClient } from '../src/prisma/prisma.client';

const prisma = createPrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'demo@qualti.io' },
    update: {
      name: 'Demo Inspector',
      password: passwordHash,
    },
    create: {
      name: 'Demo Inspector',
      email: 'demo@qualti.io',
      password: passwordHash,
    },
  });

  const organization = await prisma.organization.upsert({
    where: { slug: 'demo' },
    update: {
      name: 'Demo Manufacturing Co',
    },
    create: {
      name: 'Demo Manufacturing Co',
      slug: 'demo',
    },
  });

  await prisma.membership.upsert({
    where: {
      userId_organizationId: {
        userId: user.id,
        organizationId: organization.id,
      },
    },
    update: {
      role: 'OWNER',
    },
    create: {
      userId: user.id,
      organizationId: organization.id,
      role: 'OWNER',
    },
  });

  const siteDefinitions = [
    {
      name: 'Gurgaon Plant',
      code: 'GGN-01',
      location: 'Gurgaon, Haryana, India',
    },
    {
      name: 'Mumbai Warehouse',
      code: 'BOM-02',
      location: 'Mumbai, Maharashtra, India',
    },
    {
      name: 'Chennai Distribution Center',
      code: 'MAA-03',
      location: 'Chennai, Tamil Nadu, India',
    },
  ];

  const sites: Array<{
    id: string;
    name: string;
    code: string | null;
    location: string | null;
  }> = [];

  for (const site of siteDefinitions) {
    const existing = await prisma.site.findFirst({
      where: {
        organizationId: organization.id,
        code: site.code,
      },
    });

    if (existing) {
      sites.push(
        await prisma.site.update({
          where: { id: existing.id },
          data: site,
        }),
      );
      continue;
    }

    sites.push(
      await prisma.site.create({
        data: {
          organizationId: organization.id,
          ...site,
        },
      }),
    );
  }

  await prisma.auditEvent.deleteMany({
    where: {
      organizationId: organization.id,
      action: {
        in: [
          'organization.created',
          'user.created',
          'site.created',
          'membership.created',
        ],
      },
    },
  });

  await prisma.auditEvent.createMany({
    data: [
      {
        organizationId: organization.id,
        actorId: user.id,
        action: 'organization.created',
        entityType: 'organization',
        entityId: organization.id,
        metadata: {
          name: organization.name,
          slug: organization.slug,
        },
      },
      {
        organizationId: organization.id,
        actorId: user.id,
        action: 'user.created',
        entityType: 'user',
        entityId: user.id,
        metadata: {
          email: user.email,
          name: user.name,
        },
      },
      {
        organizationId: organization.id,
        actorId: user.id,
        action: 'membership.created',
        entityType: 'membership',
        metadata: {
          userId: user.id,
          role: 'OWNER',
        },
      },
      ...sites.map((site) => ({
        organizationId: organization.id,
        actorId: user.id,
        action: 'site.created',
        entityType: 'site',
        entityId: site.id,
        metadata: {
          name: site.name,
          code: site.code,
          location: site.location,
        },
      })),
    ],
  });

  console.log('Seed complete');
  console.log({
    user: { id: user.id, email: user.email },
    organization: { id: organization.id, slug: organization.slug },
    sites: sites.map((site) => ({ id: site.id, code: site.code })),
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
