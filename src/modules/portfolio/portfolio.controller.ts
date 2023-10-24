import { Controller, Get, Logger, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HeaderDto } from '../../models/dto/portfolio/header.dto';
import { EducationPortfolioDto } from '../../models/dto/portfolio/education-portfolio.dto';
import { WorkExperiencePortfolioDto } from '../../models/dto/portfolio/work-experience.dto';
import { SkillPortfolioDto } from '../../models/dto/portfolio/skill-portfolio.dto';
import { ProjectPortfolioDto } from '../../models/dto/portfolio/project-portfolio.dto';
import { FooterPortfolioDto } from '../../models/dto/portfolio/footer-portfolio.dto';
import { AboutDto } from '../../models/dto/portfolio/about.dto';

@Controller('portfolio')
@ApiBearerAuth()
@ApiTags('portfolio')
export class PortfolioController {
  private logger = new Logger('PortfolioController', { timestamp: true });

  constructor(private portfolioService: PortfolioService) {}

  @Get('/:id/header')
  @ApiOperation({
    summary: 'Returns the header of a user',
  })
  @ApiResponse({ status: 200, type: HeaderDto })
  getHeader(@Param('id') id: string): Promise<HeaderDto> {
    this.logger.verbose(`Retrieving the header of a user. ID: ${id}`);
    return this.portfolioService.getHeader(id);
  }

  @Get('/:id/about')
  @ApiOperation({
    summary: 'Returns the about of a user',
  })
  @ApiResponse({ status: 200, type: AboutDto })
  getAbout(@Param('id') id: string): Promise<AboutDto> {
    this.logger.verbose(`Retrieving the about of a user. ID: ${id}`);
    return this.portfolioService.getAbout(id);
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

  // TODO - RETOCAR
  @Get('/:id/projects')
  @ApiOperation({
    summary: 'Returns the projects of a user',
  })
  @ApiResponse({ status: 200, type: [ProjectPortfolioDto] })
  getProjects(@Param('id') id: string): Promise<ProjectPortfolioDto[]> {
    this.logger.verbose(`Retrieving the projects of a user. ID: ${id}`);
    return this.portfolioService.getProjects(id);
  }

  @Get('/:id/footer')
  @ApiOperation({
    summary: 'Returns the footer of a user',
  })
  @ApiResponse({ status: 200, type: FooterPortfolioDto })
  getFooter(@Param('id') id: string): Promise<FooterPortfolioDto> {
    this.logger.verbose(`Retrieving the footer of a user. ID: ${id}`);
    return this.portfolioService.getFooter(id);
  }
}
