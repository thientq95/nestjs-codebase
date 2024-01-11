export class Pagination<T> {
  items: T[];
  totalItems: number;

  constructor(items: T[], totalItems: number) {
    this.items = items;
    this.totalItems = totalItems;
  }
}
