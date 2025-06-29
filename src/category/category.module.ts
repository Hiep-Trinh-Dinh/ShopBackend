import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { UploadService } from 'src/upload/upload.service';
import { CloudinaryModule } from 'src/upload/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), CloudinaryModule],
  providers: [CategoryService, UploadService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
