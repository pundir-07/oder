export interface Review {
  customerId: string;
  orderId: string;
  text: string;
}

export interface Rating {
  itemId: number;
  customerId: string;
  rating: number | null;
}
