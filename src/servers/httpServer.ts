import express from 'express';
import cors from 'cors';
import e from 'express';
import { httpContext } from 'src/graphql/context/http.context';
import { upload } from 'src/multer';
import { FILE_CATEGORIES } from 'src/constants/fileCategories';
import { ROUTES } from 'src/constants/routes';

export const httpServer = express();

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(express.urlencoded({ extended: true }));

httpServer.post(
  ROUTES.UPLOAD,
  httpContext,
  (req: e.Request, res: e.Response) => {
    const { category } = req.params;

    if (!category || !FILE_CATEGORIES[category]) {
      res.status(400).json({
        message: 'Please set file category',
      });
    }

    if (req.file) {
      req.file.filename = FILE_CATEGORIES[category];

      upload.single('file')(req, res, () => {});

      res.status(200).json({
        message: 'File has uploaded successfully',
        file: {
          filename: req.file.filename,
          mimetype: req.file.mimetype,
          size: req.file.size,
        },
      });
    } else {
      res.status(400).json({ message: 'There are not any files found' });
    }
  },
);
