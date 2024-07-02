import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseTypeorm } from './base.typeorm';

@Entity()
export class Product extends BaseTypeorm  {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  description: string;

  @Column()
  price: number;

  @Column()
  picture: string;

  // Add more columns as needed
}
