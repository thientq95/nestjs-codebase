import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './enity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { PaginateRequest } from '@shared/models';
import { Pagination } from '@shared/models/pagination';
import { CreateCategoryDTO, UpdateCategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async paginate(request: PaginateRequest): Promise<Pagination<Category>> {
    const buildWhereCondition: Record<string, any> = {
      isDeleted: false,
    };

    if (request.keyword) {
      buildWhereCondition.name = Like(`%${request.keyword}%`);
    }

    const [items, totalItems] = await this.categoryRepository.findAndCount({
      where: buildWhereCondition,
      take: request.limit,
      skip: (request.page - 1) * request.limit,
    });

    return new Pagination<Category>(items, totalItems);
  }

  async create(model: CreateCategoryDTO, userId: number): Promise<Category> {
    return await this.categoryRepository.save({
      ...model,
      createdBy: userId,
    });
  }

  async update(model: UpdateCategoryDTO, userId: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      id: model.id,
    });

    if (!category) throw new NotFoundException('Category not found');

    return await this.categoryRepository.save({
      ...category,
      ...model,
      updatedBy: userId,
    });
  }

  async findById(id: number): Promise<Category> {
    return await this.categoryRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<Category> {
    const category = await this.findById(id);
    if (!category) throw new NotFoundException('Category not found');

    category.isDeleted = true;
    category.deletedAt = new Date();

    return await this.categoryRepository.save(category);
  }
}
