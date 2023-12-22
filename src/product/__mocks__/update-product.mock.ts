import { categoryMock } from '../../category/__mocks__/category.mock';
import { UpdateProduct } from '../dto/update-product.dto';

export const updateProductMock: UpdateProduct = {
  categoryId: categoryMock.id,
  name: 'gdsaga',
  description: '123swdwe-123dawd1312-12312231',
  price: 43.0,
};
