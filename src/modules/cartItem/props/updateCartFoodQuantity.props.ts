import { Types } from "mongoose";

export type UpdateCartFoodQuantityProps = {
  food: Types.ObjectId;
  quantity: number;
};
