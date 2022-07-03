import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';

import * as userService from './user.service';
import { app } from '../../main';
import omit from '../../helpers/omit';

const userInput = {
  email: 'john@doe.com',
  username: 'John Doe',
  password: '1234567890Qwe!',
  confirmPassword: '1234567890Qwe!',
};

const userPayload = {
  ...userInput,
  password: expect(String),
  confirmPassword: expect(String),
  __id: expect(String),
  __v: 0,
  createdAt: expect(String),
  updatedAt: expect(String),
};

/**
 *
 * @group integration
 */
describe('user controller', () => {
  describe('given a user does not exist', () => {
    it('should create one user', async () => {
      const createUserMock = jest
        .spyOn(userService, 'createUser')
        // @ts-ignore
        .mockReturnValueOnce(userPayload);

      await supertest(app)
        .post('/api/users')
        .send(userInput)
        .set('Accept', 'application/json')
        .expect(StatusCodes.CREATED);

      expect(createUserMock).toHaveBeenCalledWith(
        omit(userInput, 'confirmPassword')
      );
    });
  });

  describe('given the passwords do not match', () => {
    it('should return 400', async () => {
      const createUserMock = jest
        .spyOn(userService, 'createUser')
        // @ts-ignore
        .mockReturnValueOnce(userPayload);

      await supertest(app)
        .post('/api/users')
        .send({ ...userInput, confirmPassword: 'something' })
        .set('Accept', 'application/json')
        .expect(StatusCodes.BAD_REQUEST);

      expect(createUserMock).not.toHaveBeenCalled();
    });
  });

  describe('given a user with the same email already exists', () => {
    it('should return 409', async () => {
      interface CustomError extends Error {
        code: Number;
      }

      const error: CustomError = {
        code: 11000,
        name: 'Duplicate key error',
        message: 'Duplicate key error',
      };

      const createUserMock = jest
        .spyOn(userService, 'createUser')
        .mockImplementation(() => {
          throw error;
        });

      await supertest(app)
        .post('/api/users')
        .send(userInput)
        .set('Accept', 'application/json')
        .expect(StatusCodes.CONFLICT);

      expect(createUserMock).toHaveBeenCalledWith(
        omit(userInput, 'confirmPassword')
      );
    });
  });

  describe('given a unexpected error occurs', () => {
    it('should return 500', async () => {
      const createUserMock = jest
        .spyOn(userService, 'createUser')
        .mockImplementation(() => {
          throw new Error('Unexpected error');
        });

      await supertest(app)
        .post('/api/users')
        .send(userInput)
        .set('Accept', 'application/json')
        .expect(StatusCodes.INTERNAL_SERVER_ERROR);

      expect(createUserMock).toHaveBeenCalledWith(
        omit(userInput, 'confirmPassword')
      );
    });
  });
});
