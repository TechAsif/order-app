import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}


  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product: Product = new Product();
    product.name = createProductDto.name;
    return this.productRepository.save(product);
  }

  
  findAllProduct(): Promise<Product[]> {
    return this.productRepository.find();
  } 

  findOneProduct(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  removeProduct(id: number): Promise<{ affected?: number }> {
    return this.productRepository.delete(id);
  }
}
