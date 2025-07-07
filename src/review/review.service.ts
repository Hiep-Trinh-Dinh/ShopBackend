import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewRepository.find({
      relations: ['user', 'product', 'product.category'],
    });

    return reviews.map(review => ({
      id: review.id,
      userId: review.userId,
      productId: review.productId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: review.user ? {
        id: review.user.id,
        fullName: review.user.fullName,
        email: review.user.email,
      } : undefined,
      product: review.product ? {
        id: review.product.id,
        name: review.product.name,
        categoryName: review.product.category?.name,
      } : undefined,
    }));
  }

  async findByProduct(productId: number): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewRepository.find({
      where: { productId },
      relations: ['user', 'product', 'product.category'],
    });

    return reviews.map(review => ({
      id: review.id,
      userId: review.userId,
      productId: review.productId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: review.user ? {
        id: review.user.id,
        fullName: review.user.fullName,
        email: review.user.email,
      } : undefined,
      product: review.product ? {
        id: review.product.id,
        name: review.product.name,
        categoryName: review.product.category?.name,
      } : undefined,
    }));
  }

  async findByUser(userId: string): Promise<ReviewResponseDto[]> {
    const reviews = await this.reviewRepository.find({
      where: { userId },
      relations: ['user', 'product', 'product.category'],
    });

    return reviews.map(review => ({
      id: review.id,
      userId: review.userId,
      productId: review.productId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: review.user ? {
        id: review.user.id,
        fullName: review.user.fullName,
        email: review.user.email,
      } : undefined,
      product: review.product ? {
        id: review.product.id,
        name: review.product.name,
        categoryName: review.product.category?.name,
      } : undefined,
    }));
  }

  async findOne(id: number): Promise<ReviewResponseDto | null> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['user', 'product', 'product.category'],
    });

    if (!review) return null;

    return {
      id: review.id,
      userId: review.userId,
      productId: review.productId,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      user: review.user ? {
        id: review.user.id,
        fullName: review.user.fullName,
        email: review.user.email,
      } : undefined,
      product: review.product ? {
        id: review.product.id,
        name: review.product.name,
        categoryName: review.product.category?.name,
      } : undefined,
    };
  }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    // Kiểm tra xem user đã đánh giá sản phẩm này chưa
    const existingReview = await this.reviewRepository.findOne({
      where: {
        userId: createReviewDto.userId,
        productId: createReviewDto.productId,
      },
    });

    if (existingReview) {
      throw new ConflictException('Bạn đã đánh giá sản phẩm này rồi');
    }

    const review = this.reviewRepository.create(createReviewDto);
    return this.reviewRepository.save(review);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review | null> {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Không tìm thấy đánh giá');
    }

    await this.reviewRepository.update(id, updateReviewDto);
    return this.reviewRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException('Không tìm thấy đánh giá');
    }

    await this.reviewRepository.delete(id);
  }

  async getAverageRating(productId: number): Promise<{ averageRating: number; totalReviews: number }> {
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'averageRating')
      .addSelect('COUNT(review.id)', 'totalReviews')
      .where('review.productId = :productId', { productId })
      .getRawOne();

    return {
      averageRating: parseFloat(result.averageRating) || 0,
      totalReviews: parseInt(result.totalReviews) || 0,
    };
  }
} 