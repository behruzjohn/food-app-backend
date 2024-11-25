import { actions, makeActionsKeyboards, messageList } from 'src/utils/telegram';
import { CATEGORY_ACTIONS } from './category.actions';
import { SCENES } from 'src/constants/scenes';
import {
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
} from 'src/modules/category/category.service';
import { Markup } from 'telegraf';
import { ADMIN_ACTIONS } from '../actions';
import { adminActions } from '..';
import axios, { HttpStatusCode } from 'axios';
import { Types } from 'mongoose';
import Category from 'src/modules/category/category.model';
import { Food } from 'src/modules/food/food.model';
import { FoodInput } from 'src/modules/food/inputs/foodCreate.input';
import { createFood } from 'src/modules/food/food.service';

export const categoryActions = actions(CATEGORY_ACTIONS)({
  CREATE_CATEGORY: {
    title: "➕ Toifa qo'shish",
    getCallbackData: () => '_createcategory',
    matcher: /_createcategory/,
    handler(ctx) {
      ctx.scene.enter(SCENES.CREATE_CATEGORY);
    },
  },

  UPDATE_CATEGORY: {
    title: '✏️ Toifa yangilash',
    getCallbackData: ({ categoryId }) => `_updatecategory-${categoryId}`,
    matcher: /_updatecategory-(.+)/,
    handler(ctx) {
      ctx.scene.enter(SCENES.UPDATE_CATEGORY);
    },
  },

  DELETE_CATEGORY: {
    title: "🗑️ O'chirish",
    getCallbackData: ({ categoryId }) => `_deletecategory-${categoryId}`,
    matcher: /_deletecategory-(.+)/,
    async handler(ctx) {
      const categoryId = ctx['match'][1];

      const { payload: deletedCategory } = await deleteCategoryById({
        categoryId,
      });

      ctx.editMessageText(`Toifa ${deletedCategory.name} o'chirildi`);
    },
  },

  SELECT_CATEGORY: {
    getCallbackData: ({ categoryId }) => `_category-${categoryId}`,
    matcher: /_category-(.+)/,
    async handler(ctx) {
      const categoryId = ctx['match'][1];

      const { payload: foundCategory } = await getCategoryById({ categoryId });

      const categoryInfo = `Toifa: ${foundCategory.name}`;

      const keyboardActions = [
        ADMIN_ACTIONS.BACK,
        CATEGORY_ACTIONS.DELETE_CATEGORY,
      ];

      const controlKeyboard = makeActionsKeyboards.bind({
        ...this,
        ...adminActions,
      })(keyboardActions, {
        categoryId,
      });

      const keyboard = Markup.inlineKeyboard(controlKeyboard, { columns: 2 });

      const fileUrl =
        <string>foundCategory.image ||
        'https://th.bing.com/th/id/OIP.kTvs-fiEdCw7rldk41rhKwHaEo?w=2560&h=1600&rs=1&pid=ImgDetMain';

      const isUrlExists =
        (await axios.get(fileUrl).catch((error) => error)).status ===
        HttpStatusCode.Ok;

      if (isUrlExists) {
        await ctx.editMessageMedia(
          {
            type: 'photo',
            media: {
              url:
                <string>foundCategory.image ||
                'https://th.bing.com/th/id/OIP.kTvs-fiEdCw7rldk41rhKwHaEo?w=2560&h=1600&rs=1&pid=ImgDetMain',
            },
            caption: categoryInfo,
          },
          keyboard,
        );
      } else {
        await ctx.editMessageText(`🖼️ Rasmi - ❌\n\n${categoryInfo}`, keyboard);
      }
    },
  },

  SELECT_CATEGORIES: {
    getCallbackData: ({ categoryId }) => `_selectcategories-${categoryId}`,
    matcher: /_selectcategories-(.+)/,
    async handler(ctx) {
      const categoryId = ctx['match'][1];

      if (!ctx.scene.state) {
        ctx.scene.state = {};
      }

      if (!ctx.scene.state['categories']) {
        ctx.scene.state['categories'] = [];
      }

      let selectedCategories: Types.ObjectId[] = ctx.scene.state['categories'];

      const isCategorySelected = selectedCategories.includes(categoryId);

      if (isCategorySelected) {
        selectedCategories = selectedCategories.filter(
          (_id: string | Types.ObjectId) => _id !== categoryId,
        );
      } else {
        selectedCategories.push(categoryId);
      }

      const { payload: foundCategories } = await getAllCategories();

      const categoriesKeyboard = foundCategories.map((category) => ({
        text: <string>category['name'],
        callback_data: categoryActions[CATEGORY_ACTIONS.SELECT_CATEGORIES][
          'getCallbackData'
        ]({ categoryId: category['_id'] }),
      }));

      const controlKeyboard = makeActionsKeyboards.bind(this)(
        [CATEGORY_ACTIONS.CONFIRM_CATEGORIES],
        {},
      );

      let categoriesInfo = `📂 Tanlangan toifalar: \n\n`;

      if (selectedCategories.length) {
        categoriesInfo += messageList(
          foundCategories.filter((category) =>
            selectedCategories.includes(category['_id'].toString()),
          ),
        )('name', { key: <any>'⚪', separator: '' });
      } else {
        categoriesInfo += `Hali toifa tanlanmadi`;
      }

      ctx.scene.state['categories'] = selectedCategories;

      ctx.editMessageText(
        categoriesInfo,
        Markup.inlineKeyboard([...controlKeyboard, ...categoriesKeyboard], {
          columns: 1,
        }),
      );
    },
  },

  CONFIRM_CATEGORIES: {
    title: '✅ OK',
    getCallbackData: () => `_back`,
    matcher: /_back/,
    async handler(ctx) {
      const selectedCategories: Types.ObjectId[] =
        ctx.scene.state['categories'];

      const { foodData, filePath } = <
        { foodData: FoodInput; filePath: string }
      >ctx.scene['state'];

      await createFood({
        food: { ...foodData, category: selectedCategories[0] },
        image: filePath,
      });

      await ctx.reply('🎉 Mahsulot muvaffaqiyatli yaratildi');

      await ctx.scene.enter(SCENES.MAIN);
    },
  },
});
