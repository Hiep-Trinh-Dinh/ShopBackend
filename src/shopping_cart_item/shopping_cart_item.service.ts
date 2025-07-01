import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCartItem } from './shopping_cart_item.entity';
import { Repository } from 'typeorm';
import { GenerateCartDto } from './dto/generate_cart.dto';

@Injectable()
export class ShoppingCartItemService {
  constructor(
    @InjectRepository(ShoppingCartItem)
    private readonly shoppingCartItemRepository: Repository<ShoppingCartItem>,
  ) {}

  async generateShoppingCartItem(
    data: GenerateCartDto,
  ): Promise<ShoppingCartItem> {
    const cartItem = this.shoppingCartItemRepository.create(data);
    return await this.shoppingCartItemRepository.save(cartItem);
  }

  async getAllByUser(id: string): Promise<ShoppingCartItem[]> {
    return this.shoppingCartItemRepository.find({
      where: { userId: id },
      relations: ['product'],
    });
  }

  async removeItem(id: number): Promise<{ message: string }> {
    await this.shoppingCartItemRepository.delete(id);
    return {
      message: 'Removed item in cart successfully.',
    };
  }
}
