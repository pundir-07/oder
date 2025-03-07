export interface Item {
  id: number;
  created_at: string;
  name: string;
  price: number;
  category: Categories;
  description: string;
  isBestseller: boolean;
  imageUrl: string;
}
export enum Categories {
  SNACKS,
  MAIN_COURSE,
  DESSERTS,
  DRINKS,
}
