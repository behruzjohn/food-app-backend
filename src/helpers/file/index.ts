import path from 'path';
import fs from 'fs/promises';
import { STATIC_FOLDER_PATH } from 'src/constants/staticFolder';

export const saveFile = async (file: File): Promise<string> => {
  const filePath = path.join(STATIC_FOLDER_PATH, file.name);
  const fileBuffer = await file.arrayBuffer();

  await fs.writeFile(filePath, Buffer.from(fileBuffer));

  return `/uploads/${file.name}`;
};
