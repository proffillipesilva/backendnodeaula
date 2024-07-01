// src/controllers/example.controller.ts
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path } from 'tsoa';
import { ExampleService } from '../services/example.service';
import { Example } from '../models/entities/example';

@Route('examples')
@Tags('Examples')
export class ExampleController extends Controller {
  private exampleService = new ExampleService();

  @Get('/')
  public async getAllExamples(): Promise<Example[]> {
    return this.exampleService.getAllExamples();
  }

  @Get('/:id')
  public async getExample(@Path() id: number): Promise<Example | null> {
    return this.exampleService.getExampleById(id);
  }

  @Post('/')
  public async createExample(@Body() requestBody: { name: string }): Promise<Example> {
    return this.exampleService.createExample(requestBody.name);
  } 

  @Put('/:id')
  public async updateExample(@Path() id: number, @Body() requestBody: { name: string }): Promise<Example | null> {
    return this.exampleService.updateExample(id, requestBody.name);
  }

  @Delete('/:id')
  public async deleteExample(@Path() id: number): Promise<boolean> {
    return this.exampleService.deleteExample(id);
  }
}
