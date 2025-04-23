import supertest from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import {
  HEIGHT_FOR_TESTS,
  INVALID_HEIGHT_FOR_TESTS,
  IMAGE_FILENAME_FOR_TESTS,
  MISSING_IMAGE_FILENAME_FOR_TESTS,
  WIDTH_FOR_TESTS,
  INVALID_WIDTH_FOR_TESTS,
} from '../constants';

let app: INestApplication;
let request: supertest.SuperTest<supertest.Test>;

beforeAll(async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  request = supertest(app.getHttpServer());
});

afterAll(async () => {
  await app.close();
});

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

    it('should warn api user about width containing an invalid value', async (done) => {
      const response = await request.get(
        `/ipro/images?filename=${IMAGE_FILENAME_FOR_TESTS}&width=${INVALID_WIDTH_FOR_TESTS}&height=${HEIGHT_FOR_TESTS}`
      );
      expect(response.status).toBe(400);
      done();
    });

    it('should warn api user about height containing an invalid value', async (done) => {
      const response = await request.get(
        `/ipro/images?filename=${IMAGE_FILENAME_FOR_TESTS}&width=${WIDTH_FOR_TESTS}&height=${INVALID_HEIGHT_FOR_TESTS}`
      );
      expect(response.status).toBe(400);
      done();
    });
  });
});
