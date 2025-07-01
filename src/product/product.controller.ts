import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';
import { File } from 'multer';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginationResponseDto } from './dto/pagination-response.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.productService.findAll(paginationDto);
  }

  @Get('category/:categoryId')
  findByCategory(
    @Param('categoryId') categoryId: number,
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<ProductResponseDto>> {
    return this.productService.findByCategory(categoryId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ProductResponseDto | null> {
    return this.productService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: File,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    if (file) {
      const result = await this.uploadService.uploadImage(file);
      createProductDto.imageUrl = result.secure_url;
    }
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: File,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    if (file) {
      const result = await this.uploadService.uploadImage(file);
      updateProductDto.imageUrl = result.secure_url;
    }
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}
