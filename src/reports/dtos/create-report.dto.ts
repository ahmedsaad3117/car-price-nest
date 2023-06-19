import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateReportDto {
  @Min(99)
  @Max(1000000)
  @IsNumber()
  price: number;

  @IsString()
  make: string;
 
  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsLatitude()
  lat: number;

  @IsLongitude()
  lng: number;
}
