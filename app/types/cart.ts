import { Item } from "./item";

export interface CartContextType {
  items: CartItem[];
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  count: number;
}

export interface CartItem extends Item {
  quantity: number;
}
