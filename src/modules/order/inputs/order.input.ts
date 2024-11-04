import { Types } from "mongoose";

export interface OrderInput {
  food: Types.ObjectId;
  price: number;
  discount: number;
}
