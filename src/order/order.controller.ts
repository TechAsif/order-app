import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from './entities/product.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAllOrder();
  }

  @Get('best-selling')
  async getBestSellingProduct(): Promise<Product[]> {
    return this.orderService.topTenBestSallingProduct();
  }

  @Get('best-selling/:year')
  async getBestSellingProductForYear(@Param('year') year: number): Promise<Product[]> {
    return this.orderService.topTenBestSallingProductByYear(year);
  }

}
