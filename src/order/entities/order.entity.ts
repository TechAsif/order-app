
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./customer.entity";
import { Product } from "./product.entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @ManyToOne(() => Product, (product) => product.orders)
    product: Product;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

}
