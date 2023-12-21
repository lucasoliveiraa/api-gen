import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private products = [];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new NotFoundException('Not found product');
    }
    return product;
  }

  create(createProduct: CreateProduct) {
    console.log('service', createProduct);
    return this.products.push(createProduct);
  }

  update(id: string, createProduct: UpdateProduct) {
    const existingProduct = this.findOne(id);

    if (existingProduct) {
      const index = this.products.findIndex((product) => product.id === id);
      this.products[index] = {
        id,
        ...createProduct,
      };
    }
  }

  remove(id: string) {
    const index = this.products.findIndex((product) => product.id === id);

    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }
}
