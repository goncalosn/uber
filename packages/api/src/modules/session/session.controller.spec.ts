import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';

import * as sessionService from './session.service';
import * as userService from '../user/user.service';
import { app } from '../../main';
import { mongo } from 'mongoose';

const loginInput = {
  email: 'john@doe.com',
  password: '1234567890Qwe!',
};

const loginPayload = {
  _id: new mongo.ObjectId(),
  __v: 0,
  user: new mongo.ObjectId(),
  userAgent: 'test',
  valid: true,
  createdAt: expect(String),
  updatedAt: expect(String),
};

const userPayload = {
  __id: expect(String),
  __v: 0,
  email: 'john@doe.com',
  username: expect(String),
  password: expect(String),
  createdAt: expect(String),
  updatedAt: expect(String),
  comparePassword: () => true,
  toJSON: () => true,
};

/**
 *
 * @group integration
 */
describe('session controller', () => {
  describe('given the username and password is valid', () => {
    it('should create a new session', async () => {
      const findUserByEmailMock = jest
        .spyOn(userService, 'findUserByEmail')
        // @ts-ignore
        .mockReturnValueOnce(userPayload);

      const createSessionMock = jest
        .spyOn(sessionService, 'createSession')
        // @ts-ignore
        .mockReturnValueOnce(loginPayload);

      const response = await supertest(app)
        .post('/api/auth/login')
        .send(loginInput)
        .set('Accept', 'application/json')
        .expect(StatusCodes.OK);

      expect(response.body).toMatchObject({
        accessJwt: expect.any(String),
        refreshJwt: expect.any(String),
      });

      expect(findUserByEmailMock).toHaveBeenCalledWith(loginInput.email);

      expect(createSessionMock).toHaveBeenCalled();
    });
    it('shouldnt create a new session', async () => {
      const findUserByEmailMock = jest
        .spyOn(userService, 'findUserByEmail')
        // @ts-ignore
        .mockReturnValueOnce({ ...userPayload, comparePassword: () => false });

      const createSessionMock = jest
        .spyOn(sessionService, 'createSession')
        // @ts-ignore
        .mockReturnValueOnce(loginPayload);

      await supertest(app)
        .post('/api/auth/login')
        .send(loginInput)
        .set('Accept', 'application/json')
        .expect(StatusCodes.UNAUTHORIZED);

      expect(findUserByEmailMock).toHaveBeenCalledWith(loginInput.email);

      expect(createSessionMock).not.toHaveBeenCalled();
    });
  });
});
