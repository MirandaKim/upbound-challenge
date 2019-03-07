export interface Filter {
  id: string;
  property: string;
  value: string|number|boolean;
  valueType: string;
  condition: string;
  setLocation: string;
}
