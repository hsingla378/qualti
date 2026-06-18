import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '@prisma/client';
import type { Request } from 'express';

export type OrganizationContext = {
  id: string;
  name: string;
  slug: string;
  role: Role;
  userId: string;
};

export const CurrentOrganization = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): OrganizationContext => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.organization;
  },
);
