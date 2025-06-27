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

  async findAll(paginationDto: PaginationDto): Promise<PaginationResponseDto<ProductResponseDto>> {
    const { page = 1, limit = 8 } = paginationDto;
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.price',
        'product.stockQuantity',
        'product.categoryId',
        'product.brand',
        'product.discountPercent',
        'product.imageUrl',
        'product.createdAt',
        'product.updatedAt',
        'category.name'
      ])
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const productResponses = products.map(product => ({
      ...product,
      categoryName: product.category?.name
    }));

    return {
      data: productResponses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async findOne(id: number): Promise<ProductResponseDto | null> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.price',
        'product.stockQuantity',
        'product.categoryId',
        'product.brand',
        'product.discountPercent',
        'product.imageUrl',
        'product.createdAt',
        'product.updatedAt',
        'category.name'
      ])
      .where('product.id = :id', { id })
      .getOne();

    if (!product) return null;

    return {
      ...product,
      categoryName: product.category?.name
    };
  }

  async findByCategory(categoryId: number, paginationDto: PaginationDto): Promise<PaginationResponseDto<ProductResponseDto>> {
    const { page = 1, limit = 8 } = paginationDto;
    const skip = (page - 1) * limit;

    const [products, total] = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.price',
        'product.stockQuantity',
        'product.categoryId',
        'product.brand',
        'product.discountPercent',
        'product.imageUrl',
        'product.createdAt',
        'product.updatedAt',
        'category.name'
      ])
      .where('product.categoryId = :categoryId', { categoryId })
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const productResponses = products.map(product => ({
      ...product,
      categoryName: product.category?.name
    }));

    return {
      data: productResponses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
} 