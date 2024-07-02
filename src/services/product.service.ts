// src/services/Product.service.ts
import { CreateProductDto } from '../models/dto/product.dto';
import { ProductRepository } from '../models/repositories/product.repository';
import { Repository, getCustomRepository } from 'typeorm';
import crypto from 'crypto'
import Jimp from 'jimp';
import { v4 } from 'uuid';
import { Product } from '../models/entities/product';
import { GenericRepository } from '../models/repositories/generic.repository';

export class ProductService {
    private productRepository: GenericRepository<Product>;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(file: Express.Multer.File, productDto: CreateProductDto): Promise<Product> {
    const product = new Product();
    product.description = productDto.description;
    product.name = productDto.name;
    product.price = productDto.price;
    product.picture = await this.saveImage(file);
    return await this.productRepository.save(product);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return await this.productRepository.findOneBy({id});
  }

  async updateProduct(file: Express.Multer.File, id: string, dto: CreateProductDto): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({id});
    if (!product) {
      return null;
    }
    if(dto.name) product.name = dto.name;
    if(dto.description) product.description = dto.description;
    if(dto.price) product.price = dto.price;
    product.picture = await this.saveImage(file);
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await this.productRepository.removeBy(id);
    
  }

  private async saveImage(image: Express.Multer.File): Promise<string> {
    const savedImage = await Jimp.read(image.path);
    savedImage.resize(600, 600);
    const savedImageFileName = `pic_${v4()}_${Date.now()}.png`
    savedImage.write(`uploads/${savedImageFileName}`);
    return Promise.resolve(savedImageFileName);

  }
}
