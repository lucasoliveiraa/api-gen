import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { ProductService } from './product.service';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';
import { ReturnProduct } from './dto/return-product.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<ReturnProduct[]> {
    return (await this.productService.findAll([], true)).map(
      (product) => new ReturnProduct(product),
    );
  }

  @Get('/:productId')
  async findProductById(
    @Param('productId') productId: string,
  ): Promise<ReturnProduct> {
    return new ReturnProduct(
      await this.productService.findProductById(productId, true),
    );
  }

  @Post()
  async createProduct(
    @Body() createProduct: CreateProduct,
  ): Promise<ProductEntity> {
    return this.productService.create(createProduct);
  }

  @Put('/:productId')
  async updateProduct(
    @Body() updateProduct: UpdateProduct,
    @Param('productId') productId: string,
  ): Promise<ProductEntity> {
    return this.productService.update(productId, updateProduct);
  }

  @Delete('/:productId')
  async deleteProduct(
    @Param('productId') productId: string,
  ): Promise<DeleteResult> {
    return this.productService.remove(productId);
  }
}
