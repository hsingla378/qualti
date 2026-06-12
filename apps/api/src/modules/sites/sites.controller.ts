import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentOrganization } from '../../common/decorators/current-organization.decorator';
import type { OrganizationContext } from '../../common/decorators/current-organization.decorator';
import { OrganizationContextGuard } from '../../common/guards/organization-context.guard';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { SitesService } from './sites.service';

@Controller('sites')
@UseGuards(OrganizationContextGuard)
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get()
  findAll(@CurrentOrganization() organization: OrganizationContext) {
    return this.sitesService.findAll(organization.id);
  }

  @Post()
  create(
    @CurrentOrganization() organization: OrganizationContext,
    @Body() dto: CreateSiteDto,
  ) {
    return this.sitesService.create(organization.id, dto);
  }

  @Patch(':id')
  update(
    @CurrentOrganization() organization: OrganizationContext,
    @Param('id') id: string,
    @Body() dto: UpdateSiteDto,
  ) {
    return this.sitesService.update(organization.id, id, dto);
  }

  @Delete(':id')
  remove(
    @CurrentOrganization() organization: OrganizationContext,
    @Param('id') id: string,
  ) {
    return this.sitesService.remove(organization.id, id);
  }
}
