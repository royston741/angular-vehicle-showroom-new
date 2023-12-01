import { Item } from './Item';

export interface Order {
  total: number;
  orderItem: Item[];
  // orderDate:Date;
}
