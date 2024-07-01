// src/repositories/example.repository.ts
import { Example } from '../entities/example';
import AppDataSource from '../../data-source';

const ExampleRepository = AppDataSource.getRepository(Example)
export default ExampleRepository;
