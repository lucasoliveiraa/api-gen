import { categoryMock } from '../../category/__mocks__/category.mock';
import { ProductEntity } from '../entities/product.entity';

export const productMock: ProductEntity = {
  categoryId: categoryMock.id,
  id: 'nandjaw-awdaw-adwawdawd-adawd',
  name: 'name mock product',
  description: '123swdwe-123dawd1312-12312',
  price: 25.0,
  createdAt: new Date(),
  updatedAt: new Date(),
};
