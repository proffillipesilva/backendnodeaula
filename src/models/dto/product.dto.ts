import { Product } from "../entities/product"

export type CreateProductDto = Pick<Product, 'name' | 'description' | 'price'>