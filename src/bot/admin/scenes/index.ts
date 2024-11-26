import { createCategoryScene } from './admin/createCategory';
import { createCourierScene } from './admin/createCourier';
import { createFoodScene } from './admin/createFood';
import { mainScene } from './main';

export const adminScenes = [
  mainScene,
  createCourierScene,
  createFoodScene,
  createCategoryScene,
];
