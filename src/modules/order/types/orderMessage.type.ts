import { User } from "src/modules/user/user.model"
import { Order } from "../order.model"

export type OrderMessage={
  user: typeof User.schema.obj
  order: typeof Order.schema.obj
}