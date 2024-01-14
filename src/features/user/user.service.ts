import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { PaginateRequest } from 'src/shared/models';
import { Pagination } from 'src/shared/models/pagination';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async paginate(request: PaginateRequest): Promise<Pagination<User>> {
    const [items, totalItems] = await this.userRepository.findAndCount({
      take: request.limit,
      skip: request.page * request.limit, // think this needs to be page * limit
    });

    return new Pagination<User>(items, totalItems);
  }

  async create(model: CreateUserDTO): Promise<User> {
    return await this.userRepository.save({
      ...model,
      jobName: 'IT',
      password: await this.createPasswordDefault(),
    });
  }

  async update(model: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id: model.id,
    });

    if (!user) throw new NotFoundException('User not found');

    user.sso = model.sso;
    user.name = model.name;
    user.email = model.email;

    return await this.userRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('users')
      .andWhere('users.id = :id', { id: id })
      .getOne();
  }

  async createPasswordDefault(): Promise<string> {
    const saltOrRounds = 10;
    const password = '1111';
    return await bcrypt.hash(password, saltOrRounds);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({
      email,
    });
  }
}
