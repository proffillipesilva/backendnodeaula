// src/services/example.service.ts
import { Example } from '../models/entities/example';
import {ExampleRepository} from '../models/repositories/example.repository';
import { Repository } from 'typeorm';
import { GenericRepository } from '../models/repositories/generic.repository';

export class ExampleService {
  private exampleRepository: GenericRepository<Example>;

  constructor() {
    this.exampleRepository = new ExampleRepository();
  }

  async createExample(name: string): Promise<Example> {
    const example = new Example();
    example.name = name;
    return await this.exampleRepository.save(example);
  }

  async getAllExamples(): Promise<Example[]> {
    return await this.exampleRepository.findAll();
  }

  async getExampleById(id: number): Promise<Example | null> {
    return await this.exampleRepository.findOneBy({id});
  }

  async updateExample(id: number, newName: string): Promise<Example | null> {
    const example = await this.exampleRepository.findOneBy({id});
    if (!example) {
      return null;
    }
    example.name = newName;
    return await this.exampleRepository.save(example);
  }

  async deleteExample(id: number): Promise<boolean> {
    return await this.exampleRepository.removeBy(id);
    
  }
}
