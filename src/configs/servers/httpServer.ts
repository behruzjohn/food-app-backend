import express from 'express';
import cors from 'cors';
import e from 'express';
import { upload } from 'src/configs/multer';
import { FILE_CATEGORIES } from 'src/constants/fileCategories';
import { ROUTES } from 'src/constants/routes';
import { httpServerAuthMiddleware } from '../graphql/context/middlewares/httpServerAuth.middleware';

export const httpServer = express();

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(express.urlencoded({ extended: true }));
httpServer.use(express.static('public'));

httpServer.post(
  ROUTES.UPLOAD,
  httpServerAuthMiddleware,
  (req: e.Request, res: e.Response, next) => {
    const { category } = req.query;

    if (!category || !FILE_CATEGORIES[category + '']) {
      res.status(400).json({
        message: 'Please set file category',
      });

      return;
    }

    req.file = { ...req.file, filename: FILE_CATEGORIES[category + ''] };

    upload.single('file')(req, res, next);
  },
);
