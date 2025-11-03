import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { reviews } from "./entities/reviews.entity";
import { Repository } from "typeorm";


@Injectable()
export class reviewsService{

    constructor(
        @InjectRepository(reviews)
        private readonly reviews:Repository<reviews>
    ){}
}