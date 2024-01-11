import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post()
  public async create(
    @Body() user: CreateUserDTO
  ): Promise<any> {
    try {
      return await this.userService.create(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put()
  public async update(
    @Body() user: UpdateUserDTO
  ): Promise<any> {
    try {
      return await this.userService.update(user);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }


  @Get(':id')
  async find(@Param('id') id: number): Promise<User> {
    try {
      return await this.userService.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
