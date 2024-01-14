import { Injectable, NotFoundException } from '@nestjs/common';
import { News } from './entity/news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateRequest } from '@shared/models';
import { Pagination } from '@shared/models/pagination';
import { Repository } from 'typeorm';
import { CreateNewsDTO, UpdateNewsDTO } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async paginate(request: PaginateRequest): Promise<Pagination<News>> {
    const [items, totalItems] = await this.newsRepository.findAndCount({
      take: request.limit,
      skip: request.page * request.limit, // think this needs to be page * limit
    });

    return new Pagination<News>(items, totalItems);
  }

  async create(model: CreateNewsDTO): Promise<News> {
    return await this.newsRepository.save(model);
  }

  async update(model: UpdateNewsDTO): Promise<News> {
    const category = await this.newsRepository.findOneBy({
      id: model.id,
    });

    if (!category) throw new NotFoundException('News not found');

    return await this.newsRepository.save({
      ...category,
      ...model,
    });
  }

  async findById(id: number): Promise<News> {
    return await this.newsRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<News> {
    const category = await this.findById(id);
    if (!category) throw new NotFoundException('News not found');

    category.isDeleted = true;
    category.deletedAt = new Date();

    return await this.newsRepository.save(category);
  }
}
