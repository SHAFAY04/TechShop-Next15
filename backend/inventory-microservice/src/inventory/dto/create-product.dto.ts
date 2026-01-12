import { Type } from "class-transformer";
import {
    ArrayMinSize,
    IsArray,
    IsBoolean,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUrl,
    Validate,
    ValidateNested,
} from "class-validator";
import { DescriptionMatchesCategory } from "./DescriptionMatchesCategory";

export class ProductSalesChannelDto {
    @IsInt()
    @IsPositive()
    salesChannelId: number;

    
    @IsString()
    @IsNotEmpty()
    specificProductName: string;
}

export class PricingChannelOverrideDto {
    @IsInt()
    @IsPositive()
    salesChannelId: number;

    @IsNumber({ allowNaN: false, allowInfinity: false })
    price: number;

    @IsString()
    currencyCode: string;
}

export class PricingEnvelopeDto {
    @IsNumber({ allowNaN: false, allowInfinity: false })
    baseUsdPrice: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PricingChannelOverrideDto)
    channelOverrides?: PricingChannelOverrideDto[];
}

export class MouseDescriptionDto {
    
    @IsInt()
    weight_g: number;

    
    @IsInt()
    dpi_max: number;

    
    @IsString()
    sensor_model: string;

    
    @IsString()
    connection_type: string;

    
    @IsString()
    form_factor: string;

    
    @IsString()
    grip_style: string;

    
    @IsInt()
    programmable_buttons: number;

    
    @IsInt()
    polling_rate_hz: number;
}

export class KeyboardDescriptionDto {
    
    @IsString()
    switch_type: string;

    
    @IsString()
    switch_model: string | null;

    
    @IsString()
    form_factor: string;

    
    @IsString()
    keycap_material: string;

    
    @IsString()
    backlighting: string;

    
    @IsString()
    connection_type: string;

    
    @IsString()
    key_rollover: string;

    
    @IsBoolean()
    hot_swappable: boolean;
}

export class ScreenDescriptionDto {
    
    @IsNumber()
    screen_size_inches: number;

    
    @IsString()
    resolution: string;

    
    @IsInt()
    refresh_rate_hz: number;

    
    @IsString()
    panel_type: string;

    
    @IsNumber()
    response_time_ms: number;

    
    @IsString()
    adaptive_sync: string | null;

    
    @IsString()
    aspect_ratio: string;

    
    @IsString()
    hdr_rating: string | null;

    
    @IsInt()
    curvature_r: number | null;
}

export class PowersupplyDescriptionDto {
    
    @IsInt()
    wattage: number;

    
    @IsString()
    efficiency_rating: string;

    
    @IsString()
    modularity: string;

    
    @IsString()
    form_factor: string;

    
    @IsInt()
    fan_size_mm: number;

    
    @IsString()
    eps_connectors: string;

    
    @IsString()
    pcie_connectors: string;

    
    @IsInt()
    warranty_years: number;
}

export class CpuDescriptionDto {
    
    @IsString()
    socket_type: string;

    
    @IsInt()
    core_count: number;

    
    @IsInt()
    thread_count: number;

    
    @IsNumber()
    base_clock_ghz: number;

    
    @IsNumber()
    boost_clock_ghz: number;

    
    @IsInt()
    tdp_watts: number;

    
    @IsString()
    integrated_graphics: string | null;

    
    @IsInt()
    l3_cache_mb: number;
}

export class GpuDescriptionDto {
    
    @IsString()
    gpu_chipset: string;

    
    @IsInt()
    vram_gb: number;

    
    @IsString()
    memory_type: string;

    
    @IsInt()
    boost_clock_mhz: number;

    
    @IsString()
    interface: string;

    
    @IsString()
    cooling_type: string;

    
    @IsInt()
    length_mm: number;

    
    @IsString()
    power_connectors: string;
}

export class GamingChairDescriptionDto {
    
    @IsString()
    chair_material: string;

    
    @IsString()
    armrest_adjustability: string;

    
    @IsInt()
    max_weight_lbs: number;

    
    @IsString()
    recommended_height: string;

    
    @IsInt()
    recline_angle_degrees: number;

    
    @IsString()
    lumbar_support_type: string;

    
    @IsString()
    seat_type: string;

    
    @IsString()
    headrest_type: string;
}

export class MonitorArmsDescriptionDto {
    
    @IsString()
    mount_type: string;

    
    @IsInt()
    number_of_monitors: number;

    
    @IsNumber()
    weight_capacity_lbs: number;

    
    @IsInt()
    max_screen_size_inches: number;

    
    @IsBoolean()
    gas_spring_assisted: boolean;

    
    @IsString()
    vesa_compatibility: string;

    
    @IsNumber()
    vertical_adjustment_in: number;

    
    @IsString()
    color: string;
}

export class ProductDescriptionsDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => MouseDescriptionDto)
    mouse?: MouseDescriptionDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => KeyboardDescriptionDto)
    keyboard?: KeyboardDescriptionDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => ScreenDescriptionDto)
    screens?: ScreenDescriptionDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => PowersupplyDescriptionDto)
    psu?: PowersupplyDescriptionDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => CpuDescriptionDto)
    cpu?: CpuDescriptionDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => GpuDescriptionDto)
    gpu?: GpuDescriptionDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => GamingChairDescriptionDto)
    chairs?: GamingChairDescriptionDto;

    @IsOptional()
    @ValidateNested()
    @Type(() => MonitorArmsDescriptionDto)
    monitorarms?: MonitorArmsDescriptionDto;
}
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
  

export class CreateProductDto {
    @IsInt()
    @IsPositive()
    //you had to pass Number in .map because Object.keys returns strings always so even tho our keys are numbers like 1,2,3 it wouldve returned "1","2"
    //thats why we need to force Number so that @IsIn validation works correctly
    @IsIn(Object.keys(CATEGORY_DESCRIPTION_MAP).map(Number))
    categoryId: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayMinSize(1)
    @IsUrl({}, { each: true })
    imageUrls: string[];

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ProductSalesChannelDto)
    salesChannels: ProductSalesChannelDto[];

    @ValidateNested()
    @Type(() => PricingEnvelopeDto)
    pricing: PricingEnvelopeDto;

    @ValidateNested()
    @Type(() => ProductDescriptionsDto)
    @Validate(DescriptionMatchesCategory)
    fullDescription: ProductDescriptionsDto;
}


