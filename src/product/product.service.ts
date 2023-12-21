import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll() {
    return this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Not found product');
    }
    return product;
  }

  async create(createProduct: CreateProduct) {
    const product = this.productRepository.create(createProduct);
    return this.productRepository.save(product);
  }

  async update(id: string, updateProduct: UpdateProduct) {
    const existingProduct = await this.productRepository.preload({
      ...updateProduct,
      id,
    });

    if (!existingProduct) {
      throw new NotFoundException('Not found product');
    }
    return this.productRepository.save(existingProduct);
  }

  async remove(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Not found product');
    }

    return this.productRepository.remove(product);
  }
}
