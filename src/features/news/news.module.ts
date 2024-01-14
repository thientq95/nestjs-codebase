import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsController } from './news.controller';
import { Module } from '@nestjs/common';
import { News } from './entity/news.entity';
import { Category } from '@features/category/enity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([News, Category])],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
