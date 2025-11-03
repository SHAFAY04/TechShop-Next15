import { Controller } from "@nestjs/common";
import { reviewsService } from "./reviews.service";

@Controller('reviews')
export class reviewsController{

    constructor(
        private readonly reviewsService:reviewsService
    ){}
}