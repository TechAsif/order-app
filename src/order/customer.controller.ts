import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createUser(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAllCustomer();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOneCustomer(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.removeCustomer(+id);
  }
}
