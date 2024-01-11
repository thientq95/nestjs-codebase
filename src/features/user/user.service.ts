import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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
