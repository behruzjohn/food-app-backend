import { SCENES } from 'src/constants/scenes';
import { RoleEnum } from 'src/enums/role.enum';
import { User } from 'src/modules/user/user.model';
import { initActions, makeActionsKeyboards } from 'src/utils/telegram';
import { Composer, Markup, Scenes } from 'telegraf';
import { ADMIN_ACTIONS } from '../../actions/actions';
import { adminActions } from '../../actions';
import { categoryActions } from '../../actions/category';
import { courierActions } from '../../actions/courier';
import { foodActions } from '../../actions/food';

const indexComposer = new Composer();

indexComposer.on('message', async (ctx) => {
  // const isSuperAdmin = ctx.from.id === +process.env.SUPER_ADMIN_ID;

  const foundAdmin = await User.findOne({
    role: RoleEnum.admin,
    telegramId: ctx.from.id,
  });

  if (!foundAdmin) {
    await ctx.reply(
      `Kechirasiz ${ctx.from.first_name}, Botni ishlatishga sizga ruxsat berilmagan`,
    );

    return;
  }

  const controlKeyboard = makeActionsKeyboards.bind(adminActions)(
    [ADMIN_ACTIONS.CATEGORIES, ADMIN_ACTIONS.COURIERS, ADMIN_ACTIONS.FOODS],
    {},
  );

  await ctx.reply(
    `⚡ Boshqaruv paneli`,
    Markup.inlineKeyboard(controlKeyboard, { columns: 2 }),
  );
});

initActions(indexComposer, adminActions);
initActions(indexComposer, categoryActions);
initActions(indexComposer, courierActions);
initActions(indexComposer, foodActions);

export const mainScene = new Scenes.WizardScene(SCENES.MAIN, indexComposer);
