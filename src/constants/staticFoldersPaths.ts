import path from 'path';
import { STATIC_FOLDER_PATH } from './staticFolder';

export const UPLOADS_FOLDER = 'uploads';

export const UPLOADS_PATH = path.join(
  __dirname,
  '..',
  '..',
  STATIC_FOLDER_PATH,
  UPLOADS_FOLDER,
);
