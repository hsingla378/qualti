import { Controller, Get, UseGuards } from '@nestjs/common';
import { CurrentOrganization } from '../../common/decorators/current-organization.decorator';
import type { OrganizationContext } from '../../common/decorators/current-organization.decorator';
import { OrganizationContextGuard } from '../../common/guards/organization-context.guard';

@Controller('organizations')
@UseGuards(OrganizationContextGuard)
export class OrganizationsController {
  @Get('current')
  getCurrent(@CurrentOrganization() organization: OrganizationContext) {
    return organization;
  }
}
