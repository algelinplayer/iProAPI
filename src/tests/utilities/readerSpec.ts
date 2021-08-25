import reader from "../../utilities/reader";
import path from "path";
import {
  HEIGHT_FOR_TESTS,
  IMAGE_CACHE_DIRECTORY_FOR_TESTS,
  IMAGE_FILENAME_FOR_TESTS,
  WIDTH_FOR_TESTS,
} from "../../constants";

describe("Tests for the reader component", () => {
  describe("Functions related to getting or reading an image", () => {
    const imageCacheDirectory = IMAGE_CACHE_DIRECTORY_FOR_TESTS;
    const imageFileName = IMAGE_FILENAME_FOR_TESTS;
    const width = WIDTH_FOR_TESTS;
    const height = HEIGHT_FOR_TESTS;

    it("should build the cached image filename", async () => {
      const cachedImageFullFileName = reader.getCachedImageFileName(
        imageFileName,
        width,
        height,
        imageCacheDirectory
      );
      expect(
        cachedImageFullFileName.endsWith("icelandwaterfall_200_300.jpg")
      ).toBe(true);
    });
    it("should build the full path to the cached image", async () => {
      const cachedImageFullFileName = reader.getCachedImageFileName(
        imageFileName,
        width,
        height,
        imageCacheDirectory
      );
      const cachedImageFullFilePath = reader.cachedImageFullFilePathBuilder(
        imageFileName,
        width,
        height,
        imageCacheDirectory
      );
      expect(cachedImageFullFilePath).toBe(
        path.join(__dirname, "..", "..", "..", cachedImageFullFileName)
      );
    });
  });
});
