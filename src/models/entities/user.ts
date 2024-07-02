import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseTypeorm } from './base.typeorm';

@Entity()
export class User extends BaseTypeorm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @Column()
  picture: string;

  // Add more columns as needed
}
