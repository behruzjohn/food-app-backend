import { actions, makeActionsKeyboards } from 'src/utils/telegram';
import { FOOD_ACTIONS } from './food.actions';
import { SCENES } from 'src/constants/scenes';
import { deleteFoodById, getFoodById } from 'src/modules/food/food.service';
import { ADMIN_ACTIONS } from '../actions';
import { Markup } from 'telegraf';
import { adminActions } from '..';

export const foodActions = actions(FOOD_ACTIONS)({
  CREATE_FOOD: {
    title: "➕ Qo'shish",
    getCallbackData: () => '_createfood',
    matcher: /_createfood/,
    handler(ctx) {
      ctx.scene.enter(SCENES.CREATE_FOOD);
    },
  },

  UPDATE_FOOD: {
    getCallbackData: ({ foodId }) => `_updatefood-${foodId}`,
    matcher: /_updatefood-(.+)/,
    handler(ctx) {
      ctx.scene.enter(SCENES.UPDATE_FOOD);
    },
  },

  DELETE_FOOD: {
    title: "🗑️ O'chirish",
    getCallbackData: ({ foodId }) => `_deletefood-${foodId}`,
    matcher: /_deletefood-(.+)/,
    async handler(ctx) {
      const foodId = ctx['match'][1];

      const { payload: deletedFood } = await deleteFoodById({ foodId });

      const keyboardActions = [ADMIN_ACTIONS.BACK];

      const controlKeyboard = makeActionsKeyboards.bind(adminActions)(
        keyboardActions,
        { foodId },
      );

      ctx.editMessageText(
        `Mahsulot "${deletedFood.name}" muvaffaqiyatli o'chirildi`,
        Markup.inlineKeyboard(controlKeyboard, { columns: 2 }),
      );
    },
  },

  SELECT_FOOD: {
    getCallbackData: ({ foodId }) => `_food-${foodId}`,
    matcher: /_food-(.+)/,
    async handler(ctx) {
      const foodId = ctx['match'][1];

      const { payload: foundFood } = await getFoodById({ foodId });

      const keyboardActions = [ADMIN_ACTIONS.BACK, FOOD_ACTIONS.DELETE_FOOD];

      const controlKeyboard = makeActionsKeyboards.bind({
        ...this,
        ...adminActions,
      })(keyboardActions, { foodId });

      const foodInfo = `🍔 Mahsulot: ${foundFood.name}\n\n💲Narxi: ${foundFood.price}\n\n❤️ Layklar: ${foundFood.likes}\n\n`;

      await ctx.editMessageMedia(
        {
          type: 'photo',
          media: {
            url:
              <string>foundFood.image ||
              'https://th.bing.com/th/id/OIP.kTvs-fiEdCw7rldk41rhKwHaEo?w=2560&h=1600&rs=1&pid=ImgDetMain',
          },
          caption: foodInfo,
        },
        Markup.inlineKeyboard(controlKeyboard, { columns: 2 }),
      );
    },
  },
});
