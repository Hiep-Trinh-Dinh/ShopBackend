import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistResponseDto } from './dto/wishlist-response.dto';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async findAll(): Promise<WishlistResponseDto[]> {
    const wishlists = await this.wishlistRepository.find({
      relations: ['product', 'product.category'],
    });

    return wishlists.map(wishlist => ({
      id: wishlist.id,
      userId: wishlist.userId,
      productId: wishlist.productId,
      product: wishlist.product ? {
        id: wishlist.product.id,
        name: wishlist.product.name,
        description: wishlist.product.description,
        price: wishlist.product.price,
        stockQuantity: wishlist.product.stockQuantity,
        brand: wishlist.product.brand,
        discountPercent: wishlist.product.discountPercent,
        imageUrl: wishlist.product.imageUrl,
        categoryName: wishlist.product.category?.name,
      } : undefined,
    }));
  }

  async findByUser(userId: string): Promise<WishlistResponseDto[]> {
    const wishlists = await this.wishlistRepository.find({
      where: { userId },
      relations: ['product', 'product.category'],
    });

    return wishlists.map(wishlist => ({
      id: wishlist.id,
      userId: wishlist.userId,
      productId: wishlist.productId,
      product: wishlist.product ? {
        id: wishlist.product.id,
        name: wishlist.product.name,
        description: wishlist.product.description,
        price: wishlist.product.price,
        stockQuantity: wishlist.product.stockQuantity,
        brand: wishlist.product.brand,
        discountPercent: wishlist.product.discountPercent,
        imageUrl: wishlist.product.imageUrl,
        categoryName: wishlist.product.category?.name,
      } : undefined,
    }));
  }

  async findOne(id: number): Promise<WishlistResponseDto | null> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['product', 'product.category'],
    });

    if (!wishlist) return null;

    return {
      id: wishlist.id,
      userId: wishlist.userId,
      productId: wishlist.productId,
      product: wishlist.product ? {
        id: wishlist.product.id,
        name: wishlist.product.name,
        description: wishlist.product.description,
        price: wishlist.product.price,
        stockQuantity: wishlist.product.stockQuantity,
        brand: wishlist.product.brand,
        discountPercent: wishlist.product.discountPercent,
        imageUrl: wishlist.product.imageUrl,
        categoryName: wishlist.product.category?.name,
      } : undefined,
    };
  }

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    // Kiểm tra xem sản phẩm đã có trong wishlist của user chưa
    const existingWishlist = await this.wishlistRepository.findOne({
      where: {
        userId: createWishlistDto.userId,
        productId: createWishlistDto.productId,
      },
    });

    if (existingWishlist) {
      throw new ConflictException('Sản phẩm đã có trong danh sách yêu thích');
    }

    const wishlist = this.wishlistRepository.create(createWishlistDto);
    return this.wishlistRepository.save(wishlist);
  }

  async remove(id: number): Promise<void> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
    });

    if (!wishlist) {
      throw new NotFoundException('Không tìm thấy wishlist');
    }

    await this.wishlistRepository.delete(id);
  }

  async removeByUserAndProduct(userId: string, productId: number): Promise<void> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { userId, productId },
    });

    if (!wishlist) {
      throw new NotFoundException('Không tìm thấy sản phẩm trong danh sách yêu thích');
    }

    await this.wishlistRepository.delete(wishlist.id);
  }
} 