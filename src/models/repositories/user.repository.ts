// src/repositories/example.repository.ts
import { User } from '../entities/user';
import AppDataSource from '../../data-source';

const UserRepository = AppDataSource.getRepository(User)
export default UserRepository;
