import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { ProductService } from './product.service';
import { CustomerService } from './customer.service';
import { Product } from './entities/product.entity';
import { Customer } from './entities/customer.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
    
  ) {
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepository.findOneBy({ id: createOrderDto.customerId });
    if (!customer) {
      throw new Error('User does not exist');
    }
    const product = await this.productRepository.findOneBy({ id: createOrderDto.productId });
    if (!product) {
      throw new Error('Product does not exist');
    }
    const newOrder = new Order();
    newOrder.customer = customer;
    newOrder.product = product;
    await this.orderRepository.save(newOrder);
    return newOrder;
  }

  findAllOrder(): Promise<Product[]> {
    return this.productRepository.find();
  } 

  
  async topTenBestSallingProductByYear(year: number): Promise<Product[]> {
    const mostOrderedProductsOfYear = await this.orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.product', 'product')
    .where('EXTRACT(YEAR FROM order.createdDate) = :year', { year })
    .groupBy('product.id')
    .select(['product.id', 'COUNT(order.id) as orderCount'])
    .orderBy('orderCount', 'DESC')
    .limit(10)
    .getRawMany(); 

     return mostOrderedProductsOfYear; 
  }

  async topTenBestSallingProduct(): Promise<Product[]> {
    const mostOrderedProducts = await this.orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.product', 'product')
    .groupBy('product.id')
    .select(['product.id', 'COUNT(order.id) as orderCount'])
    .orderBy('orderCount', 'DESC')
    .limit(10)
    .getRawMany(); 

    return mostOrderedProducts; 
  }
}
