import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const graphqlUploadExpress = ({
  maxFileSize,
  maxFiles,
}: {
  maxFileSize: number;
  maxFiles: number;
}) => {
  const upload = multer({
    limits: { fileSize: maxFileSize, files: maxFiles },
    dest: 'uploads/',
  });

  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.is('multipart/form-data')) {
      return next();
    }

    upload.any()(req, res, (err: any) => {
      if (err) {
        return next(err);
      }

      if (req.files) {
        req.body.files = req.files;
      }

      next();
    });
  };
};
