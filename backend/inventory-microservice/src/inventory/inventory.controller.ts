import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Inject,
    Post,
    Query,
} from "@nestjs/common";
import { inventoryService } from "./inventory.service";
import { ClientProxy } from "@nestjs/microservices";
import { CreateProductDto } from "./dto/create-product.dto";
import { HomepageProductsQueryDto } from "./dto/homepage-products-query.dto";
import { randomUUID } from "crypto";

@Controller("inventory")
export class inventoryController {
    constructor(
        private readonly inventoryService: inventoryService,
    ) {}

    @Post("products")
    async createProduct(@Body() body: CreateProductDto) {
        const createdProduct = await this.inventoryService.createProduct(body);


        return {
            productId: createdProduct.id,
            name: createdProduct.name,
            message:
                "Product queued for downstream pricing updates. Pricing will sync asynchronously.",
        };
    }

    @Get("homepage")
    async getHomepage(@Query() query: HomepageProductsQueryDto) {
        // const response = await this.inventoryService.getHomepageProducts(query);
        
       
    }
}
