import { Get, Injectable, Param } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {

  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
  ) {}


  createUser(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer: Customer = new Customer();
    customer.name = createCustomerDto.name;
    return this.customerRepository.save(customer);
  }

  
  findAllCustomer(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  findOneCustomer(id: number): Promise<Customer> {
    return this.customerRepository.findOneBy({ id });
  }


  removeCustomer(id: number): Promise<{ affected?: number }> {
    return this.customerRepository.delete(id);
  }

 
}
