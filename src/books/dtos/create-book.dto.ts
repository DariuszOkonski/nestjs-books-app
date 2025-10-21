import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  Max,
  IsUUID,
} from 'class-validator';
// import { Type } from 'class-transformer';

export class CreateBookDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  title: string;

  @IsNotEmpty()
  // @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  // @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  price: number;

  @IsNotEmpty()
  @IsUUID()
  @IsString()
  authorId: string;
}
