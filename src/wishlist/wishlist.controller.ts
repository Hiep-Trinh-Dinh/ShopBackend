import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';

@Controller('wishlists')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.wishlistService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishlistService.findOne(id);
  }

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(createWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.wishlistService.remove(id);
  }

  @Delete('user/:userId/product/:productId')
  removeByUserAndProduct(
    @Param('userId') userId: string,
    @Param('productId') productId: number,
  ) {
    return this.wishlistService.removeByUserAndProduct(userId, productId);
  }
} 