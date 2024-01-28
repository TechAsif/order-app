import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  findAllProduct() {
    return this.productService.findAllProduct();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOneProduct(+id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.removeProduct(+id);
  }
}
