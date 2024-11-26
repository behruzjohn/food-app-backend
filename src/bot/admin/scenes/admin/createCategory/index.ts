import { SCENES } from 'src/constants/scenes';
import { Composer, Scenes } from 'telegraf';
import { savePhotoFile } from 'src/utils/telegram';
import { CategoryInput } from 'src/modules/category/inputs/category.input';
import { createCategory } from 'src/modules/category/category.service';
import { CATEGORY_ACTIONS } from 'src/bot/admin/actions/category/category.actions';
import { categoryActions } from 'src/bot/admin/actions/category';
import { log } from 'src/service/logger.service';

const indexComposer = new Composer();

indexComposer.on('text', async (ctx) => {
  ctx['scene'].state = {};

  await ctx['wizard'].next();
});

indexComposer.action(
  categoryActions[CATEGORY_ACTIONS.CREATE_CATEGORY]['matcher'],
  async (ctx) => {
    await ctx.reply('Yangi kategoriyani nomini kiriting');

    await ctx['wizard'].next();
  },
);

const getNameComposer = new Composer();

getNameComposer.on('text', async (ctx) => {
  ctx['scene'].state = { name: ctx.text };

  await ctx.reply('📥 Kategoriyani rasmini yuklang');

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

      const categoryData: CategoryInput = {
        name: state.name,
        image: filePath,
      };

      await createCategory({ category: categoryData });

      await ctx['scene'].enter(SCENES.MAIN);
    },
    async onError(ctx, error) {
      await ctx.reply(
        "Rasmni yuklashda hatolik yuz berdi iltimos boshqa rasm yuklab ko'ring",
      );

      log('ERROR', 'CATEGORY_SCENE', error.toString());
    },
  });
});

export const createCategoryScene = new Scenes.WizardScene(
  SCENES.CREATE_CATEGORY,
  indexComposer,
  getNameComposer,
  getImageComposer,
);
