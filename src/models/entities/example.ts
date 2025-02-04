import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseTypeorm } from './base.typeorm';

@Entity()
export class Example extends BaseTypeorm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Add more columns as needed
}
