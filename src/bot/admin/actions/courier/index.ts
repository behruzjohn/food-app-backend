import { actions, makeActionsKeyboards } from 'src/utils/telegram';
import { COURIER_ACTIONS } from './courier.actions';
import { SCENES } from 'src/constants/scenes';
import {
  deleteCourierById,
  getCourierById,
} from 'src/modules/courier/courier.service';
import { ADMIN_ACTIONS } from '../actions';
import { adminActions } from '..';
import { Markup } from 'telegraf';

export const courierActions = actions(COURIER_ACTIONS)({
  CREATE_COURIER: {
    title: "➕ Kuryer qo'shish",
    getCallbackData: () => `_createcourier`,
    matcher: /_createcourier/,
    handler(ctx) {
      ctx.scene.enter(SCENES.CREATE_COURIER);
    },
  },

  DELETE_COURIER: {
    title: "🗑️ O'chirish",
    getCallbackData: ({ courierId }) => `_deletecourier-${courierId}`,
    matcher: /_deletecourier-(.+)/,
    async handler(ctx) {
      const courierId = ctx['match'][1];

      await deleteCourierById({
        courierId,
      });

      ctx.editMessageText(`🎉 Kurer muvaffaqiyatli o'chirildi`);
    },
  },

  SELECT_COURIER: {
    getCallbackData: ({ courierId }) => `_courier-${courierId}`,
    matcher: /_courier-(.+)/,
    async handler(ctx) {
      const courierId = ctx['match'][1];

      const { payload: foundCourier } = await getCourierById({ courierId });

      const isDelivering = !!foundCourier.orders.length;

      const keyboardActions = [
        ADMIN_ACTIONS.BACK,
        COURIER_ACTIONS.DELETE_COURIER,
      ];

      const controlKeyboard = makeActionsKeyboards.bind({
        ...this,
        ...adminActions,
      })(keyboardActions, { courierId });

      const courierInfo = `🛵 Kurer: ${foundCourier.user['name']}\n\n📞 Telefon raqami: ${foundCourier.user['phone']}\n\n ${isDelivering ? '🟢 Holati: buyurtmani yetkazib bermoqda' : "⚪ Holati: bo'sh"}`;

      await ctx.editMessageText(
        courierInfo,
        Markup.inlineKeyboard(controlKeyboard, { columns: 2 }),
      );
    },
  },
});
