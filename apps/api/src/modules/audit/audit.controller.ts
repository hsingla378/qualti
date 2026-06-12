import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentOrganization } from '../../common/decorators/current-organization.decorator';
import type { OrganizationContext } from '../../common/decorators/current-organization.decorator';
import { OrganizationContextGuard } from '../../common/guards/organization-context.guard';
import { AuditService } from './audit.service';

@Controller('audit-events')
@UseGuards(OrganizationContextGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(@CurrentOrganization() organization: OrganizationContext) {
    return this.auditService.findAll(organization.id);
  }
}
