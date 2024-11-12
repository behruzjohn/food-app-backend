import { MODELS } from './models';

export const POPULATIONS = {
  cartItem: [{ path: 'food', model: MODELS.FOOD }],
  food: [{ path: 'category', model: MODELS.CATEGORIES }],
  order: [
    { path: 'foods', model: MODELS.CART_ITEM },
    { path: 'createdBy', model: MODELS.USER },
  ],
  courier: [
    { path: 'user', model: MODELS.USER },
    { path: 'orders', model: MODELS.ORDER },
  ],
};
