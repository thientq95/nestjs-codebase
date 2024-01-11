import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export interface IQueryRule {
  field: string;
  operator: string;
  value: string | number | boolean | object;
}

export interface IDynamicQuery {
  condition?: 'AND' | 'OR';
  rules?: (IDynamicQuery | IQueryRule)[]; // Recursively include DynamicQuery
  not?: boolean;
}

export class QueryFieldRule implements IQueryRule {
  @IsString()
  @IsNotEmpty()
  field: string;

  @IsIn(['eq', 'ne', 'gt', 'lt', 'ge', 'le', 'like', 'contains'])
  operator: string;

  @IsNotEmpty()
  value: string | number | boolean | object;
}

export class DynamicQueryFilter implements IDynamicQuery {
  @IsOptional()
  @IsIn(['AND', 'OR'])
  condition?: 'AND' | 'OR';

  @IsOptional()
  @IsBoolean()
  not?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  rules?: (DynamicQueryFilter | QueryFieldRule)[];
}
