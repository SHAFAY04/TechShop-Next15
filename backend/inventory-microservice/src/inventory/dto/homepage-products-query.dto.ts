import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class HomepageProductsQueryDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(48)
    limit: number = 48;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    salesChannelId: number;
}


