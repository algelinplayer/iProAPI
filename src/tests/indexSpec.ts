import supertest from 'supertest';
import app from '../index';
import {
  HEIGHT_FOR_TESTS,
  INVALID_HEIGHT_FOR_TESTS,
  IMAGE_FILENAME_FOR_TESTS,
  MISSING_IMAGE_FILENAME_FOR_TESTS,
  WIDTH_FOR_TESTS,
  INVALID_WIDTH_FOR_TESTS,
} from '../constants';

const request = supertest(app);

describe('Test endpoint responses', () => {
  describe('Functions related to getting the image', () => {
    it('should get the image', async (done) => {
      const response = await request.get(
        `/ipro/images?filename=${IMAGE_FILENAME_FOR_TESTS}&width=${WIDTH_FOR_TESTS}&height=${HEIGHT_FOR_TESTS}`
      );
      expect(response.status).toBe(200);
      done();
    });

    it('should not get a resized thumb of missing image', async (done) => {
      const response = await request.get(
        `/ipro/images?filename=${MISSING_IMAGE_FILENAME_FOR_TESTS}&width=${WIDTH_FOR_TESTS}&height=${HEIGHT_FOR_TESTS}`
      );
      expect(response.status).toBe(404);
      done();
    });

    it('should warn api user about width containing invalid values', async (done) => {
      const response = await request.get(
        `/ipro/images?filename=${IMAGE_FILENAME_FOR_TESTS}&width=${INVALID_WIDTH_FOR_TESTS}&height=${HEIGHT_FOR_TESTS}`
      );
      expect(response.status).toBe(400);
      done();
    });

    it('should warn api user about height containing invalid values', async (done) => {
      const response = await request.get(
        `/ipro/images?filename=${IMAGE_FILENAME_FOR_TESTS}&width=${WIDTH_FOR_TESTS}&height=${INVALID_HEIGHT_FOR_TESTS}`
      );
      expect(response.status).toBe(400);
      done();
    });
  });
});
