import { OrderedItem } from "./item";

export interface Order {
  id: string;
  items: OrderedItem[];
  isPaid?: boolean;
  createdAt: string;
  value: number;
  rating?: number;
  status: string;
  countDown: number;
}
