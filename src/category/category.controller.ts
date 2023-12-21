import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategory } from './dto/create-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { ReturnCategory } from './dto/return-category.dto';
import { UpdateCategory } from './dto/update-category.dto';
import { DeleteResult } from 'typeorm';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAllCategories(): Promise<ReturnCategory[]> {
    return this.categoryService.findAllCategories();
  }

  @Post()
  async createCategory(
    @Body() createCategory: CreateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.create(createCategory);
  }

  @Put(':categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() updateCategory: UpdateCategory,
  ): Promise<CategoryEntity> {
    return this.categoryService.update(categoryId, updateCategory);
  }

  @Delete(':categoryId')
  async deleteCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<DeleteResult> {
    return this.categoryService.delete(categoryId);
  }

  @Get(':categoryId')
  async findCategoryById(
    @Param('categoryId') categoryId: string,
  ): Promise<ReturnCategory> {
    return new ReturnCategory(
      await this.categoryService.findCategoryById(categoryId, true),
    );
  }
}
