import sharp, { OutputInfo } from "sharp";
import { Request, Response, NextFunction } from "express";
import reader from "./reader";
import { IMAGE_DIRECTORY, IMAGE_CACHE_DIRECTORY } from "../constants";

const resizer = async (req: Request, res: Response, next: NextFunction) => {
  const result = await resizeImage(
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
  let fileOut = reader.getCachedImageFileName(
    originalImageName,
    width,
    height,
    imageCacheDirectory
  );

  const exists = reader.checkIfFileExists(fileOut);

  if (exists) {
    return new Promise((resolve) => {
      return resolve("Image already cached");
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
        if (e.code !== "ENOENT") {
          reject(e);
        } else {
          resolve(e);
        }
      });
    }
  }
};

export default { resizeImage, resizer };
