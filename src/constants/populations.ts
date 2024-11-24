import { MODELS } from './models';

export const POPULATIONS = {
  cartItem: [{ path: 'food', model: MODELS.FOOD }],
  food: [{ path: 'category', model: MODELS.CATEGORIES }],
  order: [
    { path: 'createdBy', model: MODELS.USER, select: '_id name phone photo' },
  ],
  courier: [
    { path: 'user', model: MODELS.USER },
    { path: 'orders', model: MODELS.ORDER },
  ],
};
