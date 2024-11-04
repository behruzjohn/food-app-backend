import { Context } from "src/types/context";
import { Order } from "./order.model";
import { OrderOutput } from "./outputs/order.output";
import { CreateOrderProps } from "./props/createOrder.props";
import { BadRequestError } from "src/common";
import { DeliverOrderProps } from "./props/deliverOrder.props";
import { ReceiveOrderProps } from "./props/receiveOrder.props";
import { StatusEnum } from "src/enums/status.enum";

export const createOrder = async (
  { order }: CreateOrderProps,
  { user }: Context
): Promise<OrderOutput> => {
  const createdOrder = await Order.create({ ...order, user: user.id });

  return { payload: createdOrder };
};

export const deliverOrder = async (
  { order }: DeliverOrderProps,
  { user }: Context
): Promise<OrderOutput> => {
  const deliveredOrder = await Order.findOneAndUpdate(
    { _id: order, user: user.id },
    { status: StatusEnum.delivering }
  );

  if (!deliveredOrder) {
    throw new BadRequestError("Order not found");
  }

  return { payload: deliveredOrder };
};

export const receiveOrder = async (
  { order }: ReceiveOrderProps,
  { user }: Context
) => {
  // const found
};

export const getOrders = async ({ user }: Context) => {
  const foundOrders = await Order.find({ user: user.id });

  return { payload: foundOrders };
};
