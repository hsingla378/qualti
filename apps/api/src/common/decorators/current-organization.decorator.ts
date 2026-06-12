import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export type OrganizationContext = {
  id: string;
  name: string;
  slug: string;
};

export const CurrentOrganization = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): OrganizationContext => {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.organization;
  },
);
