import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingCartItem } from './shopping_cart_item.entity';
import { ShoppingCartItemController } from './shopping_cart_item.controller';
import { ShoppingCartItemService } from './shopping_cart_item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCartItem])],
  controllers: [ShoppingCartItemController],
  providers: [ShoppingCartItemService],
  exports: [ShoppingCartItemService],
})
export class ShoppingCartItemModule {}
