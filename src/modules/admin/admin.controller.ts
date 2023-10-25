import {
  Body,
  Controller,
  Logger,
  Param,
  Patch,
  UseGuards,
  Post,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminService } from './admin.service';
import { User } from '../../repositories/entities/user.entity';
import { GetUser } from '../../decorators/get-user.decorator';
import { UpdateUserDto } from '../../models/dto/admin/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../../models/dto/user.dto';
import { EducationDto } from '../../models/dto/education.dto';
import { CreateEducationDto } from '../../models/dto/admin/create-education.dto';
import { UpdateEducationDto } from '../../models/dto/admin/update-education.dto';
import { WorkExperienceDto } from '../../models/dto/work-experience.dto';
import { CreateWorkExperienceDto } from '../../models/dto/admin/create-work-experience.dto';
import { ProjectDto } from '../../models/dto/project.dto';
import { CreateProjectDto } from '../../models/dto/admin/create-project.dto';
import { CreateSkillDto } from '../../models/dto/admin/create-skill.dto';
import { SkillDto } from '../../models/dto/skill.dto';
import { ContactDto } from '../../models/dto/contact.dto';
import { CreateContactDto } from '../../models/dto/admin/create-contact.dto';
import { BulletPointDto } from '../../models/dto/bullet-point.dto';
import { CreateBulletPointDto } from '../../models/dto/admin/create-bullet-point.dto';
import { CreateTagDto } from '../../models/dto/admin/create-tag.dto';
import { CreateLinkDto } from '../../models/dto/admin/create-link.dto';
import { UpdateWorkExperienceDto } from '../../models/dto/admin/update-work-experience.dto';
import { UpdateProjectDto } from '../../models/dto/admin/update-project.dto';
import { UpdateSkillDto } from '../../models/dto/admin/update-skill.dto';
import { UpdateContactDto } from '../../models/dto/admin/update-contact.dto';
import { UpdateBulletPointDto } from '../../models/dto/admin/update-bullet-point.dto';
import { UpdateTagDto } from '../../models/dto/admin/update-tag.dto';
import { UpdateLinkDto } from '../../models/dto/admin/update-link.dto';
import { TagDto } from '../../models/dto/tag.dto';
import { FooterDto } from '../../models/dto/footer.dto';
import { CreateFooterDto } from '../../models/dto/admin/create-footer.dto';
import { LinkDto } from '../../models/dto/link.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin')
export class AdminController {
  private logger = new Logger('AdminController', { timestamp: true });

  constructor(private adminService: AdminService) {}

  @Get('/:id/user')
  @ApiOperation({
    summary: 'Get a user',
  })
  @ApiResponse({ status: 200, type: UserDto })
  getUser(@Param('id') id: string, @GetUser() user: User): Promise<UserDto> {
    this.logger.verbose(
      `User "${user.username}" getting a user. UserID: ${id}`,
    );
    return this.adminService.getUser(id, user);
  }

  @Patch('/:id/user')
  @ApiOperation({
    summary: 'Update a user',
  })
  @ApiResponse({ status: 200, type: UserDto })
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<UserDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a user. UserID: ${id} Data: ${JSON.stringify(updateUserDto)}`,
    );
    return this.adminService.updateUser(id, updateUserDto, user);
  }

  @Get('/:id/education')
  @ApiOperation({
    summary: 'Get educations',
  })
  @ApiResponse({ status: 200, type: [EducationDto] })
  getEducations(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<EducationDto[]> {
    this.logger.verbose(
      `User "${user.username}" getting educations. UserID: ${id}`,
    );
    return this.adminService.getEducations(id, user);
  }

  @Post('/:id/education')
  @ApiOperation({
    summary: 'Creates a new education',
  })
  @ApiResponse({ status: 201, type: EducationDto })
  createEducation(
    @Param('id') id: string,
    @Body() createEducationDto: CreateEducationDto,
    @GetUser() user: User,
  ): Promise<EducationDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a new education. UserID: ${id} Data: ${JSON.stringify(
        createEducationDto,
      )}`,
    );
    return this.adminService.createEducation(id, createEducationDto, user);
  }

  @Put('/:id/education/:idEducation')
  @ApiOperation({
    summary: 'Updates an education',
  })
  @ApiResponse({ status: 200, type: EducationDto })
  updateEducation(
    @Param('id') id: string,
    @Param('idEducation') idEducation: string,
    @Body() updateEducationDto: UpdateEducationDto,
    @GetUser() user: User,
  ): Promise<EducationDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating an education. UserID: ${id} Data: ${JSON.stringify(
        updateEducationDto,
      )} EducationID: ${idEducation}`,
    );
    return this.adminService.updateEducation(
      id,
      idEducation,
      updateEducationDto,
      user,
    );
  }

  @Delete('/:id/education/:idEducation')
  @ApiOperation({
    summary: 'Deletes an education',
  })
  @ApiResponse({ status: 200 })
  deleteEducation(
    @Param('id') id: string,
    @Param('idEducation') idEducation: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting an education. UserID: ${id} EducationID: ${idEducation}`,
    );
    return this.adminService.deleteEducation(id, idEducation, user);
  }

  @Get('/:id/work-experience')
  @ApiOperation({
    summary: 'Get work experiences',
  })
  @ApiResponse({ status: 200, type: [WorkExperienceDto] })
  getWorkExperiences(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<WorkExperienceDto[]> {
    this.logger.verbose(
      `User "${user.username}" getting work experiences. UserID: ${id}`,
    );
    return this.adminService.getWorkExperiences(id, user);
  }

  @Post('/:id/work-experience')
  @ApiOperation({
    summary: 'Creates a work experience',
  })
  @ApiResponse({ status: 201, type: WorkExperienceDto })
  createWorkExperience(
    @Param('id') id: string,
    @Body() createWorkExperienceDto: CreateWorkExperienceDto,
    @GetUser() user: User,
  ): Promise<WorkExperienceDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a new work experience. UserID: ${id} Data: ${JSON.stringify(
        createWorkExperienceDto,
      )}`,
    );
    return this.adminService.createWorkExperience(
      id,
      createWorkExperienceDto,
      user,
    );
  }

  @Put('/:id/work-experience/:idWorkExperience')
  @ApiOperation({
    summary: 'Updates a work experience',
  })
  @ApiResponse({ status: 200, type: WorkExperienceDto })
  updateWorkExperience(
    @Param('id') id: string,
    @Param('idWorkExperience') idWorkExperience: string,
    @Body() updateWorkExperienceDto: UpdateWorkExperienceDto,
    @GetUser() user: User,
  ): Promise<WorkExperienceDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a work experience. UserID: ${id} Data: ${JSON.stringify(
        updateWorkExperienceDto,
      )} WorkExperienceID: ${idWorkExperience}`,
    );
    return this.adminService.updateWorkExperience(
      id,
      idWorkExperience,
      updateWorkExperienceDto,
      user,
    );
  }

  @Delete('/:id/work-experience/:idWorkExperience')
  @ApiOperation({
    summary: 'Deletes a work experience',
  })
  @ApiResponse({ status: 200 })
  deleteWorkExperience(
    @Param('id') id: string,
    @Param('idWorkExperience') idWorkExperience: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a work experience. UserID: ${id} WorkExperienceID: ${idWorkExperience}`,
    );
    return this.adminService.deleteWorkExperience(id, idWorkExperience, user);
  }

  // TODO - RETOCAR
  // @Get('/:id/project')
  // @ApiOperation({
  //   summary: 'Get projects',
  // })
  // @ApiResponse({ status: 200, type: [ProjectDto] })
  // getProjects(
  //   @Param('id') id: string,
  //   @GetUser() user: User,
  // ): Promise<ProjectDto[]> {
  //   this.logger.verbose(
  //     `User "${user.username}" getting projects. UserID: ${id}`,
  //   );
  //   return this.adminService.getProjects(id, user);
  // }

  // TODO - RETOCAR
  // @Post('/:id/project')
  // @ApiOperation({
  //   summary: 'Creates a project',
  // })
  // @ApiResponse({ status: 201, type: ProjectDto })
  // createProject(
  //   @Param('id') id: string,
  //   @Body() createProjectDto: CreateProjectDto,
  //   @GetUser() user: User,
  // ): Promise<ProjectDto> {
  //   this.logger.verbose(
  //     `User "${
  //       user.username
  //     }" creating a new project. UserID: ${id} Data: ${JSON.stringify(
  //       createProjectDto,
  //     )}`,
  //   );
  //   return this.adminService.createProject(id, createProjectDto, user);
  // }

  // TODO - RETOCAR
  // @Put('/:id/project/:idProject')
  // @ApiOperation({
  //   summary: 'Updates a project',
  // })
  // @ApiResponse({ status: 200, type: ProjectDto })
  // updateProject(
  //   @Param('id') id: string,
  //   @Param('idProject') idProject: string,
  //   @Body() updateProjectDto: UpdateProjectDto,
  //   @GetUser() user: User,
  // ): Promise<ProjectDto> {
  //   this.logger.verbose(
  //     `User "${
  //       user.username
  //     }" updating a project. UserID: ${id} Data: ${JSON.stringify(
  //       updateProjectDto,
  //     )} ProjectID: ${idProject}`,
  //   );
  //   return this.adminService.updateProject(
  //     id,
  //     idProject,
  //     updateProjectDto,
  //     user,
  //   );
  // }

  // TODO - RETOCAR
  // @Delete('/:id/project/:idProject')
  // @ApiOperation({
  //   summary: 'Deletes a project',
  // })
  // @ApiResponse({ status: 200 })
  // deleteProject(
  //   @Param('id') id: string,
  //   @Param('idProject') idProject: string,
  //   @GetUser() user: User,
  // ): Promise<void> {
  //   this.logger.verbose(
  //     `User "${user.username}" deleting a project. UserID: ${id} ProjectID: ${idProject}`,
  //   );
  //   return this.adminService.deleteProject(id, idProject, user);
  // }

  @Get('/:id/skill')
  @ApiOperation({
    summary: 'Get skills',
  })
  @ApiResponse({ status: 200, type: [SkillDto] })
  getSkills(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<SkillDto[]> {
    this.logger.verbose(
      `User "${user.username}" getting skills. UserID: ${id}`,
    );
    return this.adminService.getSkills(id, user);
  }

  @Post('/:id/skill')
  @ApiOperation({
    summary: 'Creates a skill',
  })
  @ApiResponse({ status: 201, type: SkillDto })
  createSkill(
    @Param('id') id: string,
    @Body() createSkillDto: CreateSkillDto,
    @GetUser() user: User,
  ): Promise<SkillDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a skill. UserID: ${id} Data: ${JSON.stringify(
        createSkillDto,
      )}`,
    );
    return this.adminService.createSkill(id, createSkillDto, user);
  }

  @Put('/:id/skill/:idSkill')
  @ApiOperation({
    summary: 'Updates a skill',
  })
  @ApiResponse({ status: 200, type: SkillDto })
  updateSkill(
    @Param('id') id: string,
    @Param('idSkill') idSkill: string,
    @Body() updateSkillDto: UpdateSkillDto,
    @GetUser() user: User,
  ): Promise<SkillDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a skill. UserID: ${id} Data: ${JSON.stringify(
        updateSkillDto,
      )} SkillID: ${idSkill}`,
    );
    return this.adminService.updateSkill(id, idSkill, updateSkillDto, user);
  }

  @Delete('/:id/skill/:idSkill')
  @ApiOperation({
    summary: 'Deletes a skill',
  })
  @ApiResponse({ status: 200 })
  deleteSkill(
    @Param('id') id: string,
    @Param('idSkill') idSkill: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a skill. UserID: ${id} SkillID: ${idSkill}`,
    );
    return this.adminService.deleteSkill(id, idSkill, user);
  }

  @Get('/:id/contact')
  @ApiOperation({
    summary: 'Get contacts',
  })
  @ApiResponse({ status: 200, type: ContactDto })
  getContact(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<ContactDto> {
    this.logger.verbose(
      `User "${user.username}" getting contacts. UserID: ${id}`,
    );
    return this.adminService.getContact(id, user);
  }

  @Post('/:id/contact')
  @ApiOperation({
    summary: 'Creates a contact',
  })
  @ApiResponse({ status: 201, type: ContactDto })
  createContact(
    @Param('id') id: string,
    @Body() createContactDto: CreateContactDto,
    @GetUser() user: User,
  ): Promise<ContactDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a contact. UserID: ${id} Data: ${JSON.stringify(
        createContactDto,
      )}`,
    );
    return this.adminService.createContact(id, createContactDto, user);
  }

  @Put('/:id/contact/:idContact')
  @ApiOperation({
    summary: 'Updates a contact',
  })
  @ApiResponse({ status: 200, type: ContactDto })
  updateContact(
    @Param('id') id: string,
    @Param('idContact') idContact: string,
    @Body() updateContactDto: UpdateContactDto,
    @GetUser() user: User,
  ): Promise<ContactDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a contact. UserID: ${id} Data: ${JSON.stringify(
        updateContactDto,
      )} ContactID: ${idContact}`,
    );
    return this.adminService.updateContact(
      id,
      idContact,
      updateContactDto,
      user,
    );
  }

  @Delete('/:id/contact/:idContact')
  @ApiOperation({
    summary: 'Deletes a contact',
  })
  @ApiResponse({ status: 200 })
  deleteContact(
    @Param('id') id: string,
    @Param('idContact') idContact: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a contact. UserID: ${id} ContactID: ${idContact}`,
    );
    return this.adminService.deleteContact(id, idContact, user);
  }

  @Get('/:id/bullet-point')
  @ApiOperation({
    summary: 'Get bullet points',
  })
  @ApiResponse({ status: 200, type: [BulletPointDto] })
  getBulletPoints(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<BulletPointDto[]> {
    this.logger.verbose(
      `User "${user.username}" getting bullet points. UserID: ${id}`,
    );
    return this.adminService.getBulletPoints(id, user);
  }

  @Post('/:id/bullet-point')
  @ApiOperation({
    summary: 'Creates a bullet point',
  })
  @ApiResponse({ status: 201, type: BulletPointDto })
  createBulletPoint(
    @Param('id') id: string,
    @Body() createBulletPointDto: CreateBulletPointDto,
    @GetUser() user: User,
  ): Promise<BulletPointDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a bullet point. UserID: ${id} Data: ${JSON.stringify(
        createBulletPointDto,
      )}`,
    );
    return this.adminService.createBulletPoint(id, createBulletPointDto, user);
  }

  @Put('/:id/bullet-point/:idBulletPoint')
  @ApiOperation({
    summary: 'Updates a bullet point',
  })
  @ApiResponse({ status: 200, type: EducationDto })
  updateBulletPoint(
    @Param('id') id: string,
    @Param('idBulletPoint') idBulletPoint: string,
    @Body() updateBulletPointDto: UpdateBulletPointDto,
    @GetUser() user: User,
  ): Promise<BulletPointDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a bullet point. UserID: ${id} Data: ${JSON.stringify(
        updateBulletPointDto,
      )} BulletPointID: ${idBulletPoint}`,
    );
    return this.adminService.updateBulletPoint(
      id,
      idBulletPoint,
      updateBulletPointDto,
      user,
    );
  }

  @Delete('/:id/bullet-point/:idBulletPoint')
  @ApiOperation({
    summary: 'Deletes a bullet point',
  })
  @ApiResponse({ status: 200 })
  deleteBulletPoint(
    @Param('id') id: string,
    @Param('idBulletPoint') idBulletPoint: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a bullet point. UserID: ${id} BulletPointID: ${idBulletPoint}`,
    );
    return this.adminService.deleteBulletPoint(id, idBulletPoint, user);
  }

  @Get('/:id/tag')
  @ApiOperation({
    summary: 'Get tags',
  })
  @ApiResponse({ status: 200, type: [TagDto] })
  getTags(@Param('id') id: string, @GetUser() user: User): Promise<TagDto[]> {
    this.logger.verbose(`User "${user.username}" getting tags. UserID: ${id}`);
    return this.adminService.getTags(id, user);
  }

  @Post('/:id/tag')
  @ApiOperation({
    summary: 'Creates a tag',
  })
  @ApiResponse({ status: 201, type: TagDto })
  createTag(
    @Param('id') id: string,
    @Body() createTagDto: CreateTagDto,
    @GetUser() user: User,
  ): Promise<TagDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a tag. UserID: ${id} Data: ${JSON.stringify(createTagDto)}`,
    );
    return this.adminService.createTag(id, createTagDto, user);
  }

  @Put('/:id/tag/:idTag')
  @ApiOperation({
    summary: 'Updates a tag',
  })
  @ApiResponse({ status: 200, type: TagDto })
  updateTag(
    @Param('id') id: string,
    @Param('idTag') idTag: string,
    @Body() updateTagDto: UpdateTagDto,
    @GetUser() user: User,
  ): Promise<TagDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a tag. UserID: ${id} Data: ${JSON.stringify(
        updateTagDto,
      )} TagID: ${idTag}`,
    );
    return this.adminService.updateTag(id, idTag, updateTagDto, user);
  }

  @Delete('/:id/tag/:idTag')
  @ApiOperation({
    summary: 'Deletes a tag',
  })
  @ApiResponse({ status: 200 })
  deleteTag(
    @Param('id') id: string,
    @Param('idTag') idTag: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a tag. UserID: ${id} TagID: ${idTag}`,
    );
    return this.adminService.deleteTag(id, idTag, user);
  }

  @Get('/:id/link')
  @ApiOperation({
    summary: 'Get links',
  })
  @ApiResponse({ status: 200, type: [LinkDto] })
  getLinks(@Param('id') id: string, @GetUser() user: User): Promise<LinkDto[]> {
    this.logger.verbose(`User "${user.username}" getting links. UserID: ${id}`);
    return this.adminService.getLinks(id, user);
  }

  @Post('/:id/link')
  @ApiOperation({
    summary: 'Creates a link',
  })
  @ApiResponse({ status: 201, type: LinkDto })
  createLink(
    @Param('id') id: string,
    @Body() createLinkDto: CreateLinkDto,
    @GetUser() user: User,
  ): Promise<LinkDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a link. UserID: ${id} Data: ${JSON.stringify(createLinkDto)}`,
    );
    return this.adminService.createLink(id, createLinkDto, user);
  }

  @Put('/:id/link/:idLink')
  @ApiOperation({
    summary: 'Updates a link',
  })
  @ApiResponse({ status: 200, type: LinkDto })
  updateLink(
    @Param('id') id: string,
    @Param('idLink') idLink: string,
    @Body() updateLinkDto: UpdateLinkDto,
    @GetUser() user: User,
  ): Promise<LinkDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" updating a link. UserID: ${id} Data: ${JSON.stringify(
        updateLinkDto,
      )} LinkID: ${idLink}`,
    );
    return this.adminService.updateLink(id, idLink, updateLinkDto, user);
  }

  @Delete('/:id/link/:idLink')
  @ApiOperation({
    summary: 'Deletes a link',
  })
  @ApiResponse({ status: 200 })
  deleteLink(
    @Param('id') id: string,
    @Param('idLink') idLink: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a link. UserID: ${id} LinkID: ${idLink}`,
    );
    return this.adminService.deleteLink(id, idLink, user);
  }

  @Get('/:id/footer')
  @ApiOperation({
    summary: 'Get footers',
  })
  @ApiResponse({ status: 200, type: FooterDto })
  getFooters(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<FooterDto> {
    this.logger.verbose(
      `User "${user.username}" getting footer. UserID: ${id}`,
    );
    return this.adminService.getFooters(id, user);
  }

  @Post('/:id/footer')
  @ApiOperation({
    summary: 'Creates a footer',
  })
  @ApiResponse({ status: 201, type: FooterDto })
  createFooter(
    @Param('id') id: string,
    @Body() createFooterDto: CreateFooterDto,
    @GetUser() user: User,
  ): Promise<FooterDto> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a footer. UserID: ${id} Data: ${JSON.stringify(
        createFooterDto,
      )}`,
    );
    return this.adminService.createFooter(id, createFooterDto, user);
  }

  @Delete('/:id/footer/:idFooter')
  @ApiOperation({
    summary: 'Deletes a footer',
  })
  @ApiResponse({ status: 200 })
  deleteFooter(
    @Param('id') id: string,
    @Param('idFooter') idFooter: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.username}" deleting a footer. UserID: ${id} FooterID: ${idFooter}`,
    );
    return this.adminService.deleteFooter(id, idFooter, user);
  }

  // TODO - DO PARAGRAPH GET/POST/PUT/DELETE
}
