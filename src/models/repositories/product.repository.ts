// src/repositories/example.repository.ts
import AppDataSource from '../../data-source';
import { GenericRepository } from './generic.repository';
import { Product } from '../entities/product';


export class ProductRepository extends GenericRepository<Product> {
    constructor(){
        super(AppDataSource.getRepository(Product))
    }
}
