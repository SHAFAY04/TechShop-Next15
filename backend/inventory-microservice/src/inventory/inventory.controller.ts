import { Controller } from "@nestjs/common";
import { inventoryService } from "./inventory.service";

@Controller('inventory')
export class inventoryController{

    constructor(
        private readonly inventoryService:inventoryService
    ){}
}