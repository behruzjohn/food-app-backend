import { FILE_CATEGORIES } from 'src/constants/fileCategories';
import { UPLOADS_PATH } from 'src/constants/staticFoldersPaths';
import fs from 'fs';
import path from 'path';

export function createPublicFileUrl(file: string) {
  const host = process.env.HOST || 'localhost';

  const filePublicUrl = `http://${host}/uploads/${file}`;

  return filePublicUrl;
}

export function saveImage(
  fileName: keyof typeof FILE_CATEGORIES | string,
  fileExtension: string,
) {
  const fileNameIncludingExtension = `${fileName}.${fileExtension}`;

  const publicUrl = createPublicFileUrl(fileNameIncludingExtension);

  const filePath = path.join(UPLOADS_PATH, fileNameIncludingExtension);

  fs.readFileSync(filePath);

  return publicUrl;
}
