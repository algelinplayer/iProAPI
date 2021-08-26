import resizer from '../../utilities/resizer';
import reader from '../../utilities/reader';
import fs from 'fs';
import path from 'path';
import {OutputInfo} from 'sharp';
import {
  IMAGE_CACHE_DIRECTORY_FOR_TESTS,
  IMAGE_DIRECTORY,
  IMAGE_FILENAME_FOR_TESTS,
  MISSING_IMAGE_FILENAME_FOR_TESTS,
  WIDTH_FOR_TESTS,
  HEIGHT_FOR_TESTS,
} from '../../constants';
import {ENOENT} from 'constants';

describe('Tests for the resizer component', () => {
  describe('Functions related to resizing an image', () => {
    const imageCacheDirectory = IMAGE_CACHE_DIRECTORY_FOR_TESTS;
    const imageDirectory = IMAGE_DIRECTORY;
    const imageFileName = IMAGE_FILENAME_FOR_TESTS;
    const nonExistingImage = MISSING_IMAGE_FILENAME_FOR_TESTS;
    const width = WIDTH_FOR_TESTS;
    const height = HEIGHT_FOR_TESTS;

    beforeAll(() => {
      console.log(
        `Before all: cleaning [${imageCacheDirectory}] the cache directory...`
      );

      cleanCachedImages();

      function cleanCachedImages() {
        if (!fs.existsSync(imageCacheDirectory)) {
          console.log(`[${imageCacheDirectory}] does not exist`);
          fs.mkdirSync(imageCacheDirectory);
          console.log(`[${imageCacheDirectory}] created`);
        }
        let files = fs.readdirSync(imageCacheDirectory);

        for (const file of files) {
          let filePath = path.join(imageCacheDirectory, file);
          fs.unlinkSync(filePath);
          console.log(`[${filePath}] removed`);
        }
      }
    });

    it('should resize an existing image', async () => {
      const cachedImageFilePath = reader.getCachedImageFileNamePath(
        imageFileName,
        width,
        height,
        imageCacheDirectory
      );

      const firstCheck = reader.checkIfFileExists(cachedImageFilePath);

      expect(firstCheck).toBe(false);

      const outputInfo: OutputInfo = (await resizer.resizeImage(
        imageFileName,
        imageDirectory,
        width,
        height,
        imageCacheDirectory
      )) as OutputInfo;

      let secondCheck = reader.checkIfFileExists(cachedImageFilePath);

      expect(secondCheck).toBe(true);
    });

    it('should not resize an existing image because its cached version is available', async () => {
      const cachedImageFilePath = reader.getCachedImageFileNamePath(
        imageFileName,
        width,
        height,
        imageCacheDirectory
      );

      const beforeResizeCheck = reader.checkIfFileExists(cachedImageFilePath);

      expect(beforeResizeCheck).toBe(true);

      const resolvedMessage: string = (await resizer.resizeImage(
        imageFileName,
        imageDirectory,
        width,
        height,
        imageCacheDirectory
      )) as string;

      expect(resolvedMessage).toBe('Image already cached');
    });

    it('should not resize a missing image', async () => {
      const cachedImageFilePath = reader.getCachedImageFileNamePath(
        nonExistingImage,
        width,
        height,
        imageCacheDirectory
      );

      const beforeResizeCheck = reader.checkIfFileExists(cachedImageFilePath);

      expect(beforeResizeCheck).toBe(false);

      await resizer.resizeImage(
        nonExistingImage,
        imageDirectory,
        width,
        height,
        imageCacheDirectory
      );

      const afterResizeCheck = reader.checkIfFileExists(cachedImageFilePath);

      expect(afterResizeCheck).toBe(false);
    });
  });
});
