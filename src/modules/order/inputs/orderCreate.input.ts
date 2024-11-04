export interface OrderCreateInput {
  food: string,
  price: number,
  discount: number,
  status: string,
  createdAt: Date
}