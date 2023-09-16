import { Controller, Get, Logger, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PersonalInformationDto } from '../../models/dto/portfolio/personal-information.dto';
import { EducationPortfolioDto } from '../../models/dto/portfolio/education-portfolio.dto';
import { WorkExperiencePortfolioDto } from '../../models/dto/portfolio/work-experience.dto';
import { SkillPortfolioDto } from '../../models/dto/portfolio/skill-portfolio.dto';
import { ProjectPortfolioDto } from '../../models/dto/portfolio/project-portfolio.dto';
import { ContactPortfolioDto } from '../../models/dto/portfolio/contact-portfolio.dto';
import { BannerDto } from '../../models/dto/portfolio/banner.dto';

@Controller('portfolio')
@ApiBearerAuth()
@ApiTags('portfolio')
export class PortfolioController {
  private logger = new Logger('PortfolioController', { timestamp: true });

  constructor(private portfolioService: PortfolioService) {}

  @Get('/:id/personal-information')
  @ApiOperation({
    summary: 'Returns the personal information of a user',
  })
  @ApiResponse({ status: 200, type: PersonalInformationDto })
  getPersonalInformation(
    @Param('id') id: string,
  ): Promise<PersonalInformationDto> {
    this.logger.verbose(
      `Retrieving the personal information of a user. ID: ${id}`,
    );
    return this.portfolioService.getPersonalInformation(id);
  }

  @Get('/:id/education')
  @ApiOperation({
    summary: 'Returns the education of a user',
  })
  @ApiResponse({ status: 200, type: [EducationPortfolioDto] })
  getEducation(@Param('id') id: string): Promise<EducationPortfolioDto[]> {
    this.logger.verbose(`Retrieving the education of a user. ID: ${id}`);
    return this.portfolioService.getEducation(id);
  }

  @Get('/:id/work-experience')
  @ApiOperation({
    summary: 'Returns the work experience of a user',
  })
  @ApiResponse({ status: 200, type: [WorkExperiencePortfolioDto] })
  getWorkExperience(
    @Param('id') id: string,
  ): Promise<WorkExperiencePortfolioDto[]> {
    this.logger.verbose(`Retrieving the work experience of a user. ID: ${id}`);
    return this.portfolioService.getWorkExperience(id);
  }

  @Get('/:id/skills')
  @ApiOperation({
    summary: 'Returns the skills of a user',
  })
  @ApiResponse({ status: 200, type: [SkillPortfolioDto] })
  getSkills(@Param('id') id: string): Promise<SkillPortfolioDto[]> {
    this.logger.verbose(`Retrieving the skills of a user. ID: ${id}`);
    return this.portfolioService.getSkills(id);
  }

  @Get('/:id/projects')
  @ApiOperation({
    summary: 'Returns the projects of a user',
  })
  @ApiResponse({ status: 200, type: [ProjectPortfolioDto] })
  getProjects(@Param('id') id: string): Promise<ProjectPortfolioDto[]> {
    this.logger.verbose(`Retrieving the projects of a user. ID: ${id}`);
    return this.portfolioService.getProjects(id);
  }

  @Get('/:id/contacts')
  @ApiOperation({
    summary: 'Returns the contacts of a user',
  })
  @ApiResponse({ status: 200, type: ContactPortfolioDto })
  getContacts(@Param('id') id: string): Promise<ContactPortfolioDto> {
    this.logger.verbose(`Retrieving the contacts of a user. ID: ${id}`);
    return this.portfolioService.getContacts(id);
  }

  @Get('/:id/banner')
  @ApiOperation({
    summary: 'Returns the banners of a user',
  })
  @ApiResponse({ status: 200, type: BannerDto })
  getBanner(@Param('id') id: string): Promise<BannerDto> {
    this.logger.verbose(`Retrieving the banner of a user. ID: ${id}`);
    return this.portfolioService.getBanner(id);
  }
}
