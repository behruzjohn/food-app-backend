import { Composer, Context } from 'telegraf';
import {
  Action,
  MessageListOptions,
  PaginationKeyboardOptions,
  SavePhotoFileOptions,
} from './telegram.types';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

export const savePhotoFile = async (
  ctx: Context,
  fileId: string,
  { onSuccess, onError }: SavePhotoFileOptions,
) => {
  const fileInfo = await ctx.telegram.getFile(fileId);

  const { file_path } = fileInfo;

  const fileUrl = `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${file_path}`;

  const response = await axios.get(fileUrl, { responseType: 'stream' });

  const savePath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'public',
    'uploads',
    `${fileId}.${path.basename(file_path).split('.')[1]}`,
  );

  const writer = fs.createWriteStream(savePath);

  response.data.pipe(writer);

  writer.on('finish', () => {
    const appUrl = `http://${process.env.HOST || `localhost:${process.env.PORT}`}`;

    const fileUrl = path.join(
      appUrl,
      'uploads',
      `${fileId}.${path.basename(file_path).split('.')[1]}`,
    );

    onSuccess(ctx, fileUrl);
  });

  writer.on('error', (error) => {
    onError(ctx, error);
  });
};

export const actions =
  <K extends Record<string, string>>(actionsNames: K) =>
  <T extends Record<keyof K, Action>>(actions: T) => {
    const validatedActions: Record<string, Action> = {};

    for (const action of Object.keys(actions)) {
      validatedActions[actionsNames[action]] = actions[action];
    }

    return validatedActions;
  };

export const initActions = (
  composer: Composer<any>,
  actions: Record<string, Action>,
) => {
  for (const actionName of Object.keys(actions)) {
    const action = actions[actionName];

    if (action['matcher']) {
      composer.action(action['matcher'], (ctx) => {
        action.handler
          .bind(actions)(ctx)
          ?.catch((error: unknown) =>
            console.error(
              `Error while handling action "${actionName}"\n`,
              error,
            ),
          );
      });
    }
  }
};

export const makeActionsKeyboards = function <T extends Record<string, any>>(
  actions: string[],
  callbackData: T,
) {
  return Object.keys(this)
    .filter((key) => actions.includes(key))
    .map((action) => ({
      text: this[action].title,
      callback_data: this[action].getCallbackData(callbackData),
    }));
};

export const fill = (width: number, symbol: string = ' ') =>
  width ? new Array(width).fill(symbol).join('') : '';

export const messageList =
  <T extends Record<string, any>>(list: T[]) =>
  (
    value: keyof T,
    {
      spacings = 0,
      startIndex = 1,
      key = '',
      separator = ')',
      inTheEnd = '',
    }: MessageListOptions<T> = {},
  ) => {
    return list
      .map(
        (item, index) =>
          `${fill(spacings)}${item[key] || key || index + startIndex}${separator} ${item[value]}${inTheEnd}`,
      )
      .join(fill(2, '\n'));
  };

export const makePaginationKeyboard = (
  { page, hasNextPage, hasPrevPage }: PaginationKeyboardOptions,
  callbackDataGetter: (...args: any) => string,
) => {
  const buttons = [];

  if (hasPrevPage) {
    buttons.push({
      text: '◀️',
      callback_data: `${callbackDataGetter({ page: page - 1 })}`,
    });
  }

  if (hasNextPage) {
    buttons.push({
      text: '▶️',
      callback_data: `${callbackDataGetter({ page: page + 1 })}`,
    });
  }

  return buttons;
};
