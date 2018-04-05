export interface FilterRule {
  field: string;
  compareWith: any;
  interval?: {start: any, end: any};
  exact?: boolean;
}
