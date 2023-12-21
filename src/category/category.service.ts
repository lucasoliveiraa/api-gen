import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategory } from './dto/create-category.dto';
import { UpdateCategory } from './dto/update-category.dto';
import { ReturnCategory } from './dto/return-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAllCategories(): Promise<ReturnCategory[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || categories.length === 0) {
      throw new NotFoundException('Categories empty');
    }

    return categories.map((category) => new ReturnCategory(category));
  }

  async findCategoryById(
    categoryId: string,
    isRelations?: boolean,
  ): Promise<CategoryEntity> {
    const relations = isRelations
      ? {
          products: true,
        }
      : undefined;

    const category = await this.categoryRepository.findOne({
      where: {
        id: categoryId,
      },
      relations,
    });

    if (!category) {
      throw new NotFoundException(`Category id: ${categoryId} not found`);
    }

    return category;
  }

  async findCategoryByName(name: string): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({
      where: {
        name,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category name ${name} not found`);
    }

    return category;
  }

  async create(createCategory: CreateCategory): Promise<CategoryEntity> {
    const category = await this.findCategoryByName(createCategory.name).catch(
      () => undefined,
    );

    if (category) {
      throw new BadRequestException(
        `Category name ${createCategory.name} exist`,
      );
    }

    return this.categoryRepository.save(createCategory);
  }

  async delete(categoryId: string): Promise<any> {
    const category = await this.findCategoryById(categoryId, true);

    if (category.products?.length > 0) {
      throw new BadRequestException('Category with relations.');
    }

    return this.categoryRepository.delete({ id: categoryId });
  }

  async update(
    categoryId: string,
    updateCategory: UpdateCategory,
  ): Promise<CategoryEntity> {
    const category = await this.findCategoryById(categoryId);

    return this.categoryRepository.save({
      ...category,
      ...updateCategory,
    });
  }
}
