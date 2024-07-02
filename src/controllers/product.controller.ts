// src/controllers/example.controller.ts
import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path, FormField, UploadedFile, Security } from 'tsoa';
import { ProductService } from '../services/product.service';
import { Product } from '../models/entities/product';
import { CreateProductDto } from '../models/dto/product.dto';

@Route('products')
@Tags('Products')
export class ProductController extends Controller {
  private productService = new ProductService();

  @Get('/')
  public async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  public async getProduct(@Path() id: string): Promise<Product | null> {
    return this.productService.getProductById(id);
  }

  @Post('/')
  @Security('jwt')
  public async createProduct(
      @FormField() name: string,
      @FormField() description: string,
      @FormField() price: number,
      @UploadedFile() file: Express.Multer.File): Promise<Product> {
      const dto = {} as CreateProductDto;
      dto.name = name;
      dto.description = description;
      dto.price = price;
    return this.productService.createProduct(file, dto);
  } 

  @Put('/:id')
  @Security('jwt')
  public async updateProduct(@Path() id: string,
  @FormField() name: string,
      @FormField() description: string,
      @FormField() price: number,
      @UploadedFile() file: Express.Multer.File):  Promise<Product | null> {
      const dto = {} as CreateProductDto;
      dto.name = name;
      dto.description = description;
      dto.price = price;
    return this.productService.updateProduct(file, id, dto);
  }

  @Delete('/:id')
  @Security('jwt')
  public async deleteProduct(@Path() id: string): Promise<boolean> {
    return this.productService.deleteProduct(id);
  }
}
