import path from 'path';
import fs, {PathLike, promises as fsPromises} from 'fs';
import {NextFunction, Request, Response} from 'express';
import {IMAGE_CACHE_DIRECTORY} from '../constants';

const cachedImageFullFilePathBuilder = (
  filename: string,
  width: number,
  height: number,
  imageCacheDirectory: string
) => {
  let cachedImageFilePath = getCachedImageFileNamePath(
    filename,
    width,
    height,
    imageCacheDirectory
  );
  return path.join(__dirname, '..', '..', cachedImageFilePath);
};

const imagePathBuilder = (req: Request, res: Response, next: NextFunction) => {
  res.locals.cachedImageFullFilePath = cachedImageFullFilePathBuilder(
    req.query.filename as string,
    parseInt(req.query.width as string),
    parseInt(req.query.height as string),
    IMAGE_CACHE_DIRECTORY
  );
  next();
};

const thumbSender = (req: Request, res: Response) => {
  if (res.locals.cachedImageFullFilePath) {
    res.sendFile(res.locals.cachedImageFullFilePath);
  } else {
    res.status(500).send('Could not resize the image.');
  }
};

const getCachedImageFileNamePath = (
  imageFileName: string,
  width: number,
  height: number,
  imageCacheDirectory: string
): string => {
  let fileExtension = imageFileName.split('.').pop();
  let onlyFileName = imageFileName.split('.')[0];
  return path.join(
    imageCacheDirectory,
    onlyFileName + '_' + width + '_' + height + '.' + fileExtension
  );
};

const getImageFileNamePath = (
  imageFileName: string,
  imageDirectory: string
): string => {
  return path.join(imageDirectory, imageFileName);
};

const checkIfFileExists = (file: PathLike): boolean => {
  return fs.existsSync(file);
};

const getFileBuffer = async (
  originDirectory: string,
  originalImageName: string
) => {
  const filePath = path.join(originDirectory, originalImageName);
  try {
    return await fsPromises.readFile(filePath);
  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log(`Error: The image file ${filePath} does not exist.`);
    }
    throw e;
  }
};

export default {
  getImageFileNamePath,
  getCachedImageFileNamePath,
  checkIfFileExists,
  getFileBuffer,
  imagePathBuilder,
  thumbSender,
  cachedImageFullFilePathBuilder,
};
