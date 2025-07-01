import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { PaginationResponseDto } from './dto/pagination-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<ProductResponseDto>> {
    const { page = 1, limit = 8 } = paginationDto;
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository.findAndCount({
      relations: ['category'],
      skip,
      take: limit,
    });

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<ProductResponseDto | null> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!product) return null;

    return product;
  }

  async findByCategory(
    categoryId: number,
    paginationDto: PaginationDto,
  ): Promise<PaginationResponseDto<ProductResponseDto>> {
    const { page = 1, limit = 8 } = paginationDto;
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository.findAndCount({
      where: { categoryId },
      relations: ['category'],
      skip,
      take: limit,
    });

    return {
      data: products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
