import { Context } from 'telegraf';
import { SceneContext, WizardContext } from 'telegraf/typings/scenes';

export type Action =
  | {
      handler: (ctx: WizardContext & SceneContext & Context) => any;
    }
  | {
      matcher: RegExp;
      getCallbackData: (...props: any[]) => string;
      handler: (ctx: WizardContext & SceneContext & Context) => any;
    }
  | {
      title: string;
      matcher: RegExp;
      getCallbackData: (...props: any[]) => string;
      handler: (ctx: WizardContext & SceneContext & Context) => any;
    };

export type MessageListOptions<T> = {
  spacings?: number;
  startIndex?: number;
  key?: keyof T | '';
  separator?: string;
  inTheEnd?: string;
};

export type PaginationKeyboardOptions = {
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type SavePhotoFileOptions = {
  onSuccess: (ctx: Context, filePath: string) => void;
  onError: (ctx: Context, error: unknown) => void;
};
