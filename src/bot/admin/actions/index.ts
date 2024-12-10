import {
  actions,
  makeActionsKeyboards,
  makePaginationKeyboard,
  messageList,
} from 'src/utils/telegram';
import { ADMIN_ACTIONS } from './actions';
import { getAllFoods } from 'src/modules/food/food.service';
import { Markup } from 'telegraf';
import { getAllCategories } from 'src/modules/category/category.service';
import { foodActions } from './food';
import { FOOD_ACTIONS } from './food/food.actions';
import { DEFAULT_PAGINATION_LIMIT } from 'src/constants/pagination';
import { getCouriers } from 'src/modules/courier/courier.service';
import { COURIER_ACTIONS } from './courier/courier.actions';
import { courierActions } from './courier';
import { categoryActions } from './category';
import { CATEGORY_ACTIONS } from './category/category.actions';

export const adminActions = actions(ADMIN_ACTIONS)({
  COURIERS: {
    title: '🛵 Kuryerlar',
    getCallbackData: () => '_couriers',
    matcher: /_couriers/,
    async handler(ctx) {
      const { payload: foundCouriers } = await getCouriers({});

      const couriersKeyboard = foundCouriers.map((courier) => ({
        text: courier.user['name'],
        callback_data: courierActions[COURIER_ACTIONS.SELECT_COURIER][
          'getCallbackData'
        ]({ courierId: courier['_id'] }),
      }));

      const keyboardActions = [
        ADMIN_ACTIONS.BACK,
        COURIER_ACTIONS.CREATE_COURIER,
      ];

      const controlKeyboard = makeActionsKeyboards.bind({
        ...this,
        ...courierActions,
      })(keyboardActions, {});

      const messageText = foundCouriers.length
        ? '🛵 Kurerlar'
        : '🛵 Kurerlar mavjud emas';

      await ctx.editMessageText(
        messageText,
        Markup.inlineKeyboard([...controlKeyboard, ...couriersKeyboard], {
          columns: 2,
        }),
      );
    },
  },

  FOODS: {
    title: '🍔 Mahsulotlar',
    getCallbackData: ({ page }) => `_foods-${page}`,
    matcher: /_foods-(.+)/,
    async handler(ctx) {
      const page = +ctx['match'][1] || 1;

      const {
        payload: foundFoods,
        hasNextPage,
        hasPrevPage,
      } = await getAllFoods(
        {
          limit: DEFAULT_PAGINATION_LIMIT,
          page,
        },
        null,
      );

      const paginationKeyboard = makePaginationKeyboard(
        { page, hasNextPage, hasPrevPage },
        this[ADMIN_ACTIONS.FOODS].getCallbackData,
      );

      const keyboardActions = [ADMIN_ACTIONS.BACK, FOOD_ACTIONS.CREATE_FOOD];

      const controlKeyboard = makeActionsKeyboards.bind({
        ...this,
        ...foodActions,
      })(keyboardActions);

      const foodsKeyboard = foundFoods.map((food) => ({
        text: food.name,
        callback_data: foodActions[FOOD_ACTIONS.SELECT_FOOD]['getCallbackData'](
          { foodId: food['_id'] },
        ),
      }));

      ctx.editMessageText(
        `Mahsulotlar`,
        Markup.inlineKeyboard(
          [...controlKeyboard, ...foodsKeyboard, ...paginationKeyboard],
          {
            columns: 2,
          },
        ),
      );
    },
  },

  CATEGORIES: {
    title: '📂 Kategoriyalar',
    getCallbackData: () => '_categories',
    matcher: /_categories/,
    async handler(ctx) {
      const { payload: foundCategories } = await getAllCategories();

      const keyboardActions = [
        ADMIN_ACTIONS.BACK,
        CATEGORY_ACTIONS.CREATE_CATEGORY,
      ];

      const controlKeyboard = makeActionsKeyboards.bind({
        ...this,
        ...categoryActions,
      })(keyboardActions);

      const categoriesKeyboard = foundCategories.map((category) => ({
        text: category.name,
        callback_data: categoryActions[CATEGORY_ACTIONS.SELECT_CATEGORY][
          'getCallbackData'
        ]({ categoryId: category['_id'] }),
      }));

      ctx.editMessageText(
        `Kategoriyalar`,
        Markup.inlineKeyboard([...controlKeyboard, ...categoriesKeyboard], {
          columns: 2,
        }),
      );
    },
  },

  BACK: {
    title: '🔙 Orqaga',
    getCallbackData: () => '_back',
    matcher: /_back/,
    async handler(ctx) {
      const controlKeyboard = makeActionsKeyboards.bind(adminActions)(
        [ADMIN_ACTIONS.CATEGORIES, ADMIN_ACTIONS.COURIERS, ADMIN_ACTIONS.FOODS],
        {},
      );

      if (!ctx.update['callback_query'].message.photo) {
        await ctx.editMessageText(
          `⚡ Boshqaruv paneli`,
          Markup.inlineKeyboard(controlKeyboard, { columns: 2 }),
        );
      } else {
        await ctx.deleteMessage(ctx.update['callback_query'].message_id);

        await ctx.reply(
          `⚡ Boshqaruv paneli`,
          Markup.inlineKeyboard(controlKeyboard, { columns: 2 }),
        );
      }
    },
  },
});
