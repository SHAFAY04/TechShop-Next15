import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PowersupplyDescription } from "../entities/psuDescription.entity";
import { MouseDescription } from "../entities/mouseDescription.entity";
import { CpuDescriptionDto, CreateProductDto, GamingChairDescriptionDto, GpuDescriptionDto, KeyboardDescriptionDto, MonitorArmsDescriptionDto, MouseDescriptionDto, PowersupplyDescriptionDto, ScreenDescriptionDto } from "./create-product.dto";

export const CATEGORY_DESCRIPTION_MAP = {
  1: "chairs",
  2: "cpu",
  3: "gpu",
  4: "keyboard",
  5: "mouse",
  6: "psu",
  7: "screens",
  8: "monitorarms",
} as const;



@ValidatorConstraint({ name: "DescriptionMatchesCategory", async: false })
export class DescriptionMatchesCategory implements ValidatorConstraintInterface {
  validate(fullDescription: Record<string,unknown>, args: ValidationArguments): boolean {

   
    const categoryId = (args.object as CreateProductDto).categoryId
    const allowedCategory = CATEGORY_DESCRIPTION_MAP[categoryId];


    //if full description object doesnt have anything 
    if (!fullDescription || typeof fullDescription !== "object") {
      return false;
    }


    // Count how many descriptions are present
    const providedKeys = Object.keys(fullDescription).filter(
      key => fullDescription[key] !== null
    );

    // Must provide exactly one description field
    if (providedKeys.length !== 1) return false;

    // Provided field must match category
    return providedKeys[0] === allowedCategory;
  }

  defaultMessage(args: any) {
    const categoryId = args.object.categoryId;
    const allowedField = CATEGORY_DESCRIPTION_MAP[categoryId];

    return `categoryId=${categoryId} requires a description for "${allowedField}" only.`;
  }
}
