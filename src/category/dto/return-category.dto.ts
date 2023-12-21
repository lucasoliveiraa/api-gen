import { ReturnProduct } from '../../product/dto/return-product.dto';
import { CategoryEntity } from '../entities/category.entity';

export class ReturnCategory {
  id: string;
  name: string;
  products?: ReturnProduct[];

  constructor(categoryEntity: CategoryEntity) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.products = categoryEntity.products
      ? categoryEntity.products.map((product) => new ReturnProduct(product))
      : undefined;
  }
}
