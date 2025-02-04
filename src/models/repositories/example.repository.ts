// src/repositories/example.repository.ts
import { Example } from '../entities/example';
import AppDataSource from '../../data-source';
import { GenericRepository } from './generic.repository';


export class ExampleRepository extends GenericRepository<Example> {
    constructor(){
        super(AppDataSource.getRepository(Example))
    }
}
