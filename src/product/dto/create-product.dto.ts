import { IsNumber, IsString } from 'class-validator';

export class CreateProduct {
  @IsString()
  categoryId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;
}
