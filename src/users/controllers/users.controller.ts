import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { projectsEntity } from 'src/projects/entities/projects.entity';
import { UserDTO, UserToProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('Users')
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('ADMIN')
  @Get()
  public async findAllUsers() {
    return await this.usersService.findUsers();
  }

  @ApiParam({ name: 'userId' })
  @ApiHeader({ name: 'satoshi-token' })
  @Get(':userId')
  public async findUserById(@Param('userId', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findUserById(id);
  }

  @ApiParam({ name: 'projectId' })
  @AccessLevel('OWNER')
  @Post('add-to-project/:projectId')
  public async createUserProject(
    @Body() body: UserToProjectDTO,
    @Param('projectId', new ParseUUIDPipe()) id: string,
  ) {
    return await this.usersService.relationToProject({
      ...body,
      project: id as unknown as projectsEntity,
    });
  }

  @Post()
  @PublicAccess()
  public async createUser(@Body() body: UserDTO) {
    return await this.usersService.createUser(body);
  }

  @Put(':userId')
  public async updateUser(
    @Param('userId', new ParseUUIDPipe()) id: string,
    @Body() body: UserUpdateDTO,
  ) {
    return await this.usersService.updateUser(body, id);
  }

  @ApiParam({ name: 'userId' })
  @Delete(':userId')
  public async deleteUser(@Param('userId', new ParseUUIDPipe()) id: string) {
    return await this.usersService.deleteUser(id);
  }
}
