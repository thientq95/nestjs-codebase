export interface CustomPropertyName {
  [name: string]: string;
}

export interface WhereCondition {
  clause: string;
  parameters: { [param: string]: string | number | string[] };
}

export class QueryFilterOptions {
  customPropertyName: CustomPropertyName;
  hookOperators: { [name: string]: () => WhereCondition };
}
