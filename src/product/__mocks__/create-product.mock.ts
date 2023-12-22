import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProduct } from '../dto/create-product.dto';

export const createProductMock: CreateProduct = {
  categoryId: categoryMock.id,
  name: 'name mock product',
  description: '123swdwe-123dawd1312-12312',
  price: 25.0,
};
