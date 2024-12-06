import { SCENES } from 'src/constants/scenes';
import { Composer, Markup, Scenes } from 'telegraf';
import { foodActions } from 'src/bot/admin/actions/food';
import { FOOD_ACTIONS } from 'src/bot/admin/actions/food/food.actions';
import { initActions, savePhotoFile } from 'src/utils/telegram';
import { FoodInput } from 'src/modules/food/inputs/foodCreate.input';
import { categoryActions } from 'src/bot/admin/actions/category';
import { getAllCategories } from 'src/modules/category/category.service';
import { CATEGORY_ACTIONS } from 'src/bot/admin/actions/category/category.actions';

const indexComposer = new Composer();

indexComposer.on('text', async (ctx) => {
  ctx['scene'].state = {};

  await ctx['wizard'].next();
});

indexComposer.action(
  foodActions[FOOD_ACTIONS.CREATE_FOOD]['matcher'],
  async (ctx) => {
    await ctx.reply('Yangi mahsulotni nomini kiriting');

    await ctx['wizard'].next();
  },
);

const getNameComposer = new Composer();

getNameComposer.on('text', async (ctx) => {
  ctx['scene'].state = { name: ctx.text };

  ctx.reply('Mahsulotni narxini kiriting');

  await ctx['wizard'].next();
});
const getPriceComposer = new Composer();

getPriceComposer.on('text', async (ctx) => {
  if (!+ctx.text) {
    await ctx.reply('Mahsulotni narxini kiriting');
    return;
  }

  ctx['scene'].state.price = +ctx.text;

  const { state } = ctx['scene'];

  const foodInfo = `🍔 Mahsulot: ${state.name}\n\n💲 Narxi: ${state.price}`;

  await ctx.reply(`${foodInfo}`);

  await ctx.reply('📥 Mahsulotni rasmini yuklang');

  await ctx['wizard'].next();
});

const getImageComposer = new Composer();

getImageComposer.on('photo', async (ctx) => {
  const photos = ctx.message.photo;
  const largestPhoto = photos[photos.length - 1];
  const fileId = largestPhoto.file_id;

  await savePhotoFile(ctx, fileId, {
    async onSuccess(ctx, filePath) {
      await ctx.reply('🎉 Rasm muvaffaqiyatli yuklandi!');

      const { state } = ctx['scene'];

      const foodData: FoodInput = {
        name: state.name,
        price: state.price,
        discount: 0,
        shortName: state.name,
        category: <any>'',
      };

      const { payload: foundCategories } = await getAllCategories();

      const categoriesKeyboard = foundCategories.map((category) => ({
        text: <string>category['name'],
        callback_data: categoryActions[CATEGORY_ACTIONS.SELECT_CATEGORIES][
          'getCallbackData'
        ]({ categoryId: category['_id'] }),
      }));

      ctx['scene'].state = { foodData, filePath };

      await ctx.reply(
        '🍔 Mahsulotni toifalarini tanlang',
        Markup.inlineKeyboard(categoriesKeyboard),
      );

      await ctx['wizard'].next();
    },
    async onError(ctx, error) {
      await ctx.reply(
        "Rasmni yuklashda hatolik yuz berdi iltimos boshqa rasm yuklab ko'ring",
      );
    },
  });
});

const getCategoriesComposer = new Composer();

initActions(getCategoriesComposer, categoryActions);

export const createFoodScene = new Scenes.WizardScene(
  SCENES.CREATE_FOOD,
  indexComposer,
  getNameComposer,
  getPriceComposer,
  getImageComposer,
  getCategoriesComposer,
);
