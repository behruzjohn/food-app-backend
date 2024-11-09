import { MODELS } from './models';

export const POPULATIONS = {
  cartItem: [{ path: 'food', model: MODELS.FOOD }],
  food: [{ path: 'category', model: MODELS.CATEGORIES }],
  order: [
    { path: 'foods', model: MODELS.FOOD },
    { path: 'createdBy', model: MODELS.USER },
  ],
};
