import { Transform } from 'class-transformer';
import {
    IsNumber,
    IsString,
    Min,
    Max,
    IsLatitude,
    IsLongitude,
} from 'class-validator';

export class GetEstimateDto {

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year: number;

    @Transform(({ value }) => parseFloat(value))
    @IsNumber()
    @Min(0)
    @Max(1000000)
    mileage: number;

    @IsLatitude()
    lat: number;

    @IsLongitude()
    lng: number;
}
