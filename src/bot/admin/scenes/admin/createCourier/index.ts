import { SCENES } from 'src/constants/scenes';
import { Composer, Scenes } from 'telegraf';
import { User } from 'src/modules/user/user.model';
import { Courier } from 'src/modules/courier/courier.model';
import { RoleEnum } from 'src/enums/role.enum';
import { COURIER_ACTIONS } from 'src/bot/admin/actions/courier/courier.actions';
import { courierActions } from 'src/bot/admin/actions/courier';

const indexComposer = new Composer();

indexComposer.on('text', async (ctx) => {
  ctx['scene'].state = {};

  await ctx.reply('Kurerni ismini kiriting');

  await ctx['wizard'].next();
});

indexComposer.action(
  courierActions[COURIER_ACTIONS.CREATE_COURIER]['matcher'],
  async (ctx) => {
    await ctx.reply('Kurerni ismini kiriting');

    await ctx['wizard'].next();
  },
);

const getNameComposer = new Composer();

getNameComposer.on('text', async (ctx) => {
  ctx['scene'].state = { name: ctx.text };

  await ctx.reply('Kurerni telefon raqamini kiriting');

  await ctx['wizard'].next();
});

const getPhoneComposer = new Composer();

getPhoneComposer.on('text', async (ctx) => {
  ctx['scene'].state.phone = ctx.text;

  await ctx.reply('Kurerni parolini kiriting');

  await ctx['wizard'].next();
});

const getPasswordComposer = new Composer();

getPasswordComposer.on('text', async (ctx) => {
  ctx['scene'].state.password = ctx.text;

  await ctx.reply('🎉 Kurer muvaffaqiyatli yaratildi');

  const createdUser = await User.create({
    name: ctx['scene'].state.name,
    phone: ctx['scene'].state.phone,
    password: ctx['scene'].state.password,
    role: RoleEnum.courier,
  });

  await Courier.create({
    user: createdUser._id,
  });

  await ctx['wizard'].next();
});

export const createCourierScene = new Scenes.WizardScene(
  SCENES.CREATE_COURIER,
  indexComposer,
  getNameComposer,
  getPhoneComposer,
  getPasswordComposer,
);
