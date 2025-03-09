import { OrderedItem } from "./item";

export interface Order {
  id: string;
  items: OrderedItem[];
  isPayed: boolean;
  createdAt: Date | null;
  value: number;
}
