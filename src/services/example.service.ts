// src/services/example.service.ts
import { Example } from '../models/entities/example';
import ExampleRepository from '../models/repositories/example.repository';
import { Repository } from 'typeorm';

export class ExampleService {
  private exampleRepository: Repository<Example>;

  constructor() {
    this.exampleRepository = ExampleRepository;
  }

  async createExample(name: string): Promise<Example> {
    const example = new Example();
    example.name = name;
    return await this.exampleRepository.save(example);
  }

  async getAllExamples(): Promise<Example[]> {
    return await this.exampleRepository.find();
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
    const result = await this.exampleRepository.delete(id);
    return result.affected === 1;
  }
}
