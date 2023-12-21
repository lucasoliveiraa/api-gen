import { ReturnCategory } from '../../category/dto/return-category.dto';
import { ProductEntity } from '../entities/product.entity';

export class ReturnProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category?: ReturnCategory;

  constructor(productEntity: ProductEntity) {
    this.id = productEntity.id;
    this.name = productEntity.name;
    this.description = productEntity.description;
    this.price = productEntity.price;
    this.category = productEntity.category
      ? new ReturnCategory(productEntity.category)
      : undefined;
  }
}
