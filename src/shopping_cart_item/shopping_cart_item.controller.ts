import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ShoppingCartItemService } from './shopping_cart_item.service';
import { GenerateCartDto } from './dto/generate_cart.dto';
import { ShoppingCartItem } from './shopping_cart_item.entity';

@Controller('carts')
export class ShoppingCartItemController {
  constructor(
    private readonly shoppingCartItemService: ShoppingCartItemService,
  ) {}

  @Post()
  async generateShoppingCartItem(@Body() data: GenerateCartDto) {
    return this.shoppingCartItemService.generateShoppingCartItem(data);
  }

  @Get('user/:id')
  async getAllByUser(@Param('id') id: string): Promise<ShoppingCartItem[]> {
    return this.shoppingCartItemService.getAllByUser(id);
  }

  @Delete(':id')
  async removeItem(@Param('id') id: number) {
    return this.shoppingCartItemService.removeItem(id);
  }
}
