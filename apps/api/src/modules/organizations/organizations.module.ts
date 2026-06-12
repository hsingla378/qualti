import { Module } from '@nestjs/common';
import { OrganizationContextGuard } from '../../common/guards/organization-context.guard';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, OrganizationContextGuard],
  exports: [OrganizationsService, OrganizationContextGuard],
})
export class OrganizationsModule {}
