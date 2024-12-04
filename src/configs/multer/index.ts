import { Request } from 'express';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req: { fileName: string } & Request, file, cb) => {
    cb(null, `${req.fileName}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});
