import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param(':id') id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  create(@Body() createProduct: CreateProduct) {
    console.log('contro', createProduct);
    return this.productService.create(createProduct);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProduct: UpdateProduct) {
    return this.productService.update(id, updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
