import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Delete, Get, Inject, Logger, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ApiTags } from '@nestjs/swagger';
import { PaginateRequest } from '@shared/models';
import { Pagination } from '@shared/models/pagination';
import { Category } from './enity/category.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/category.dto';
import { GetCurrentUserId } from '@core/auth/decorators';

@ApiTags('categories')
@Controller('categories')
@Controller()
export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async index(@Query() request: PaginateRequest): Promise<Pagination<Category>> {
    return await this.categoryService.paginate({
      limit: request.hasOwnProperty('limit') ? request.limit : 10,
      page: request.hasOwnProperty('page') ? request.page : 0,
      keyword: request.hasOwnProperty('keyword') ? request.keyword : '',
    });
  }

  @Post()
  public async create(@Body() category: CreateCategoryDTO, @GetCurrentUserId() userId: number): Promise<Category> {
    try {
      return await this.categoryService.create(category, userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put()
  public async update(@Body() category: UpdateCategoryDTO, @GetCurrentUserId() userId: number): Promise<Category> {
    try {
      return await this.categoryService.update(category, userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<Category> {
    try {
      return await this.categoryService.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Category> {
    try {
      return await this.categoryService.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
