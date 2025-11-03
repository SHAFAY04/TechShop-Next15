import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { products } from "./entities/products.entity";
import { Repository } from "typeorm";

@Injectable()
export class inventoryService{

    constructor(
        @InjectRepository(products)
        private readonly products:Repository<products>
    ){}



}