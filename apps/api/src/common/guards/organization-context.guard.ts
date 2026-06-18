import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { OrganizationsService } from '../../modules/organizations/organizations.service';

@Injectable()
export class OrganizationContextGuard implements CanActivate {
  constructor(private readonly organizationsService: OrganizationsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.user) {
      throw new UnauthorizedException('Authentication required');
    }

    const organizationId = this.getOrganizationId(
      request.headers['x-organization-id'],
    );

    const organization = await this.organizationsService.findMembershipContext(
      request.user.id,
      organizationId,
    );

    if (!organization) {
      throw new ForbiddenException(
        'You do not have access to this organization',
      );
    }

    request.organization = organization;
    return true;
  }

  private getOrganizationId(value: string | string[] | undefined) {
    if (Array.isArray(value)) {
      return value[0];
    }

    return value;
  }
}
