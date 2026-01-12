import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { products } from "./entities/products.entity";

import { category } from "./entities/category.entity";
import { channelProducts } from "./entities/channelProducts.entity";
import { salesChannel } from "./entities/salesChannel.entity";
import { productImage } from "./entities/productImages.entity";
import { CreateProductDto, MouseDescriptionDto, ProductDescriptionsDto } from "./dto/create-product.dto";
import { MonitorarmsDescription } from "./entities/armsDescription.entity";
import { GamingchairDescription } from "./entities/chairsDescription.entity";
import { CPUDescription } from "./entities/cpuDescription.entity";
import { GPUDescription } from "./entities/gpuDescription.entity";
import { KeyboardDescription } from "./entities/keyboardDescription.entity";
import { MouseDescription } from "./entities/mouseDescription.entity";
import { PowersupplyDescription } from "./entities/psuDescription.entity";
import { ScreenDescription } from "./entities/screensDescription.entity";
import { HomepageProductsQueryDto } from "./dto/homepage-products-query.dto";
import { DataSource } from "typeorm";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class inventoryService {
    constructor(
        private readonly dataSource: DataSource,
        @Inject("PRICING_SERVICE")
        private readonly pricingClient:ClientProxy
    ) { }

    async createProduct(payload: CreateProductDto) {
        const { categoryId, name, description, imageUrls, salesChannels, fullDescription,pricing } = payload;
        let createdProduct!:products
      
        await this.dataSource.manager.transaction(async (manager) => {

            const array = salesChannels.map(channel =>
            manager.findOne(salesChannel, { where: { id: channel.salesChannelId } })
          );
      
          const results = await Promise.all(array);
      
          if (results.length !== salesChannels.length) {
            throw new BadRequestException("Sales Channel doesn't exist");
          }
      
          const productWithoutId = manager.create(products, { categoryId, name, description });
          createdProduct = await manager.save(productWithoutId);
      
          const channelprodsTransaction = salesChannels.map(channel => {
            const cp = manager.create(channelProducts, {
              productId: createdProduct.id,
              saleschannelId: channel.salesChannelId,
              specificProductName: channel.specificProductName,
            });
            return manager.save(cp);
          });
      
          const productImagesTransaction = imageUrls.map(url => {
            const pi = manager.create(productImage, { productId: createdProduct.id, link: url });
            return manager.save(pi);
          });

          const mapForProductFullDescriptionOriginalTypeOrmEntityName:Record<string,any>={
              "mouse":MouseDescription,
              "keyboard":KeyboardDescription,
              "gpu":GPUDescription,
              "cpu":CPUDescription,
              "psu":PowersupplyDescription,
              "screens":ScreenDescription,
              "chairs":GamingchairDescription,
              "monitorarms":MonitorarmsDescription
          }
      
          const productDescriptionTransaction = Object.entries(fullDescription).map(([key,value]) => {

            const entity=mapForProductFullDescriptionOriginalTypeOrmEntityName[key]
             const fd= manager.create(entity,{ productId: createdProduct.id, ...value })
             return manager.save(fd)
          });
      
          await Promise.all([
            ...channelprodsTransaction,
            ...productImagesTransaction,
            ...productDescriptionTransaction,
          ]);
        })
        
        //here we emit the product created event with the product information and pricingDTO so that pricing microservice can subscribe to it//
        //also dont confuse that if the above transaction fails we might be sending an event for the pricing of a product that doesnt even exist
        //because javascript wont even reach this event if transaction fails it would throw an error above stop the code.
          this.pricingClient.emit('product_created',{
            createdProduct,pricing
          })  

          return createdProduct
        
      }
      

}