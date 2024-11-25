import { actions } from 'src/utils/telegram';
import { ORDER_ACTIONS } from './order.actions';
import {
  getOrders,
  updateOrderStatusById,
} from 'src/modules/order/order.service';
import { StatusEnum } from 'src/enums/status.enum';
import { DEFAULT_PAGINATION_LIMIT } from 'src/constants/pagination';

export const orderActions = actions(ORDER_ACTIONS)({
  COOK_ORDER: {
    title: '',
    getCallbackData: ({ orderId }) => `_cook-${orderId}`,
    matcher: /_cook-(.+)/,
    async handler(ctx) {
      const orderId = ctx['match'][1];

      const { payload: updatedOrder } = await updateOrderStatusById({
        orderId,
        status: StatusEnum.delivering,
      });

      const orderInfo = `Order <b>${updatedOrder._id.toString().slice()}</b>`;

      await ctx.editMessageText(orderInfo);
    },
  },

  GET_ORDERS: {
    title: '🛍️ Buyurtmalar',
    getCallbackData: ({ page }) => `_orders-${page}`,
    matcher: /_orders-(.+)/,
    async handler(ctx) {
      const page = ctx['match'][1];

      const {
        payload: foundOrders,
        hasNextPage,
        hasPrevPage,
      } = await getOrders({
        page,
        limit: DEFAULT_PAGINATION_LIMIT,
      });
    },
  },
});
