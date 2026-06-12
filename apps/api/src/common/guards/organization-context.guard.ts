import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { OrganizationsService } from '../../modules/organizations/organizations.service';

@Injectable()
export class OrganizationContextGuard implements CanActivate {
  constructor(private readonly organizationsService: OrganizationsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const organizationId = request.headers['x-organization-id'];

    const organization =
      typeof organizationId === 'string' && organizationId.length > 0
        ? await this.organizationsService.findById(organizationId)
        : await this.organizationsService.findDemoOrganization();

    if (!organization) {
      throw new NotFoundException('Organization not found');
    }

    request.organization = organization;
    return true;
  }
}
