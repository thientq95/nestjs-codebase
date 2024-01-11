import { Type } from "class-transformer";
import { IsOptional, IsArray, ValidateNested, IsString, IsNotEmpty, IsIn, IsNumber, Min } from "class-validator";

import { DynamicQueryFilter } from "./dynamic-query";
import { PAGINATION_DEFAULT } from "../constants/app.constant";
import { SortDirectionEnum } from "../enums/sort-direction.enum";

export interface ISortRule {
  sortBy: string;
  sortOrder: string;
}

export class QueryFilterRequest {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DynamicQueryFilter)
  filters?: DynamicQueryFilter[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sortBy?: string;

  @IsOptional()
  @IsIn([SortDirectionEnum.ASC, SortDirectionEnum.DESC])
  sortOrder?: SortDirectionEnum;

  @IsOptional()
  sort: ISortRule | ISortRule[];

  @IsOptional()
  @IsNumber()
  @Min(1)
  page?: number = PAGINATION_DEFAULT.PAGE;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number = PAGINATION_DEFAULT.LIMIT;

  @IsOptional()
  @IsNumber()
  @Min(1)
  pageSize?: number;
}
