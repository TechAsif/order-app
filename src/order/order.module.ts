import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Product } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order,Customer,Product])],
  controllers: [OrderController,CustomerController,ProductController],
  providers: [OrderService,CustomerService,ProductService],
})
export class OrderModule {}
