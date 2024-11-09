export interface FoodInput {
  image: File;
  shortName: string;
  name: string;
  description?: string;
  price: number;
  discount: number;
}
