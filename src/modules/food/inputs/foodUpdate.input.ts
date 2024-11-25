export interface FoodUpdateInput {
  shortName?: string;
  name?: string;
  description?: string;
  price?: number;
  discount?: number;
  categories: [string];
}
