import { Injectable, NotFoundException } from '@nestjs/common';
import { AuditService } from '../audit/audit.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Injectable()
export class SitesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  findAll(organizationId: string) {
    return this.prisma.site.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(organizationId: string, id: string) {
    const site = await this.prisma.site.findFirst({
      where: { id, organizationId },
    });

    if (!site) {
      throw new NotFoundException('Site not found');
    }

    return site;
  }

  async create(organizationId: string, dto: CreateSiteDto, actorId?: string) {
    const site = await this.prisma.site.create({
      data: {
        organizationId,
        name: dto.name,
        code: dto.code,
        location: dto.location,
      },
    });

    await this.auditService.record({
      organizationId,
      actorId,
      action: 'site.created',
      entityType: 'site',
      entityId: site.id,
      metadata: {
        name: site.name,
        code: site.code,
        location: site.location,
      },
    });

    return site;
  }

  async update(
    organizationId: string,
    id: string,
    dto: UpdateSiteDto,
    actorId?: string,
  ) {
    const existing = await this.findOne(organizationId, id);

    const site = await this.prisma.site.update({
      where: {
        id_organizationId: {
          id: existing.id,
          organizationId,
        },
      },
      data: dto,
    });

    await this.auditService.record({
      organizationId,
      actorId,
      action: 'site.updated',
      entityType: 'site',
      entityId: site.id,
      metadata: {
        before: {
          name: existing.name,
          code: existing.code,
          location: existing.location,
        },
        after: {
          name: site.name,
          code: site.code,
          location: site.location,
        },
      },
    });

    return site;
  }

  async remove(organizationId: string, id: string, actorId?: string) {
    const existing = await this.findOne(organizationId, id);

    await this.prisma.site.delete({
      where: {
        id_organizationId: {
          id: existing.id,
          organizationId,
        },
      },
    });

    await this.auditService.record({
      organizationId,
      actorId,
      action: 'site.deleted',
      entityType: 'site',
      entityId: existing.id,
      metadata: {
        name: existing.name,
        code: existing.code,
        location: existing.location,
      },
    });

    return { deleted: true, id: existing.id };
  }
}
