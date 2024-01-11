export class BasePayload<T> {
  data: T;

  constructor(target: T) {
    this.data = target;
  }
}

export class BasePaginationPayload<T> {
  items: Array<T>;
  totalItems: number;

  constructor(items: Array<T>, totalItems: number) {
    this.items = items;
    this.totalItems = totalItems;
  }
}
