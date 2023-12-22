import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { ProductController } from '../product.controller';
import { productMock } from '../__mocks__/product.mock';
import { returnDeleteMock } from '../../__mocks__/return-delete.mock';
import { createProductMock } from '../__mocks__/create-product.mock';
import { updateProductMock } from '../__mocks__/update-product.mock';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([productMock]),
            create: jest.fn().mockResolvedValue(productMock),
            findProductById: jest.fn().mockResolvedValue(productMock),
            update: jest.fn().mockResolvedValue(productMock),
            remove: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(productService).toBeDefined();
  });

  it('should return returnProduct in findAll', async () => {
    const products = await controller.findAll();

    expect(products).toEqual([
      {
        id: productMock.id,
        name: productMock.name,
        description: productMock.description,
        price: productMock.price,
      },
    ]);
  });

  it('should return returnProduct in findByProductId', async () => {
    const products = await controller.findProductById(productMock.id);

    expect(products).toEqual({
      id: productMock.id,
      name: productMock.name,
      description: productMock.description,
      price: productMock.price,
    });
  });

  it('should return productEntity in create', async () => {
    const product = await controller.createProduct(createProductMock);

    expect(product).toEqual(productMock);
  });

  it('should return returnDelete in delete', async () => {
    const product = await controller.deleteProduct(productMock.id);

    expect(product).toEqual(returnDeleteMock);
  });

  it('should return ProductEntity in update', async () => {
    const product = await controller.updateProduct(
      updateProductMock,
      productMock.id,
    );

    expect(product).toEqual(productMock);
  });
});
