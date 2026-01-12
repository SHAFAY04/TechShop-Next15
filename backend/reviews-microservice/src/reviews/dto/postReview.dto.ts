import { IsInt, IsNotEmpty, IsString, IsOptional, IsDefined, Min, Max } from "class-validator";
import { Type } from "class-transformer";

export class PostReviewDTO {

    @IsDefined()
    @IsInt()
    @Type(() => Number) 
    userId: number;

    @IsDefined()
    @IsInt()
    @Type(() => Number)
    productId: number;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    userName: string;

    @IsOptional() 
    @IsString()
    comment?: string;

    @IsDefined()
    @IsInt()
    @Min(1) 
    @Max(5) 
    @Type(() => Number)
    stars: number;
}