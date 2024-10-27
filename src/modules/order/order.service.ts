import { ApolloError } from 'apollo-server-core';
import { Order } from './order.model';
import { Food } from '../food/food.model';

export const createFood = async ({ order }) => {
  try {
    const createdOrder = await Order.create(order);
    if (!createdOrder) {
      throw new ApolloError('Order not created!');
    }
    return createdOrder;
  } catch (error) {
    throw new ApolloError('Error during creating order!');
  }
};

export const getOrderById = async ({ order }) => {
  try {
    const foundOrder = await Order.findById(order.id);
    if (!foundOrder) {
      throw new ApolloError('Order not found');
    }
    return foundOrder;
  } catch (error) {
    throw new ApolloError('Error during getting the order');
  }
};

export const updateOrderById = async ({ id, order }) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, order, {
      new: true,
    });
    if (!updatedOrder) {
      throw new ApolloError('Order not found!');
    }
    return updatedOrder;
  } catch (error) {
    throw new ApolloError('Error during updating order');
  }
};

export const deleteFoodById = async ({ order }) => {
  try {
    await Order.findByIdAndDelete(order.id);
    return;
  } catch (error) {
    throw new ApolloError('Error during deleting the order');
  }
};
