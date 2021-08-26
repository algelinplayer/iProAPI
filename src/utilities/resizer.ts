import sharp from 'sharp';
import {Request, Response, NextFunction} from 'express';
import reader from './reader';
import {IMAGE_DIRECTORY, IMAGE_CACHE_DIRECTORY} from '../constants';

const resizer = async (req: Request, res: Response, next: NextFunction) => {
  let width = req.query.width;
  let height = req.query.height;

  if (
    typeof height === 'undefined' ||
    Number.isNaN(-height) ||
    typeof width === 'undefined' ||
    Number.isNaN(-width)
  ) {
    res.status(400).send('Width and height must be integers.');
    return;
  }

  let imageFilePath = reader.getImageFileNamePath(
    req.query.filename as string,
    IMAGE_DIRECTORY
  );

  const imageFileExists = reader.checkIfFileExists(imageFilePath);

  if (!imageFileExists) {
    res.status(404).send('Image file does not exists.');
    return;
  }

  await resizeImage(
    req.query.filename as string,
    IMAGE_DIRECTORY,
    parseInt(req.query.width as string),
    parseInt(req.query.height as string),
    IMAGE_CACHE_DIRECTORY
  );
  next();
};

const resizeImage = async (
  originalImageName: string,
  originDirectory: string,
  width: number,
  height: number,
  imageCacheDirectory: string
): Promise<unknown> => {
  let fileOut = reader.getCachedImageFileNamePath(
    originalImageName,
    width,
    height,
    imageCacheDirectory
  );

  const exists = reader.checkIfFileExists(fileOut);

  if (exists) {
    return new Promise((resolve) => {
      return resolve('Image already cached');
    });
  } else {
    try {
      const fileBuffer = await reader.getFileBuffer(
        originDirectory,
        originalImageName
      );
      return await sharp(fileBuffer).resize(width, height).toFile(fileOut);
    } catch (e) {
      return new Promise((resolve, reject) => {
        if (e.code !== 'ENOENT') {
          reject(e);
        } else {
          resolve(e);
        }
      });
    }
  }
};

export default {resizeImage, resizer};
