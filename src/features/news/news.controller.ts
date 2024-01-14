import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { News } from './entity/news.entity';
import { CreateNewsDTO, UpdateNewsDTO } from './dto/news.dto';
import { PaginateRequest } from '@shared/models';
import { Pagination } from '@shared/models/pagination';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@ApiTags('news')
@Controller('news')
@Controller()
export class NewsController {
  constructor(
    private newsService: NewsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async index(@Query() request: PaginateRequest): Promise<Pagination<News>> {
    return await this.newsService.paginate({
      limit: request.hasOwnProperty('limit') ? request.limit : 10,
      page: request.hasOwnProperty('page') ? request.page : 0,
    });
  }

  @Post()
  public async create(@Body() news: CreateNewsDTO): Promise<News> {
    try {
      return await this.newsService.create(news);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put()
  public async update(@Body() news: UpdateNewsDTO): Promise<News> {
    try {
      return await this.newsService.update(news);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async find(@Param('id') id: number): Promise<News> {
    try {
      return await this.newsService.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<News> {
    try {
      return await this.newsService.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
