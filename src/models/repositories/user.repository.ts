// src/repositories/example.repository.ts
import { User } from '../entities/user';
import AppDataSource from '../../data-source';
import { GenericRepository } from './generic.repository';

export class UserRepository extends GenericRepository<User> {
    constructor(){
        super(AppDataSource.getRepository(User))
    }
}
