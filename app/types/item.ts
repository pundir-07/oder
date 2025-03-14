import { CartItem } from "./cart";

export interface Item {
  id: number;
  created_at?: string;
  name: string;
  price: number;
  category?: Categories;
  description?: string;
  isBestseller?: boolean;
  imageUrl?: string;
  rating?: number;
  ratingCount?: number;
}
export enum Categories {
  SNACKS,
  MAIN_COURSE,
  DESSERTS,
  DRINKS,
}

export interface OrderedItem extends CartItem {
  served?: boolean;
}
