import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { get } from 'lodash';

import {
  DOMAIN,
  JWT_EXPIRATION,
  JWT_EXPIRATION_REFRESH,
  LOCAL_DEV,
} from '../../utils/constants';
import { findUserByEmail } from '../user/user.service';
import { signJWT } from './session.utils';
import omit from '../../helpers/omit';
import { LoginBody } from './session.schema';
import { createSession, findSession, updateSession } from './session.service';

const loginHandler = async (
  req: Request<object, object, LoginBody>,
  res: Response
) => {
  const { email, password } = req.body;

  // find the user by email
  const user = await findUserByEmail(email);

  // check user exists
  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('Invalid email or password');
  }

  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '');

  // create the payload
  const payload = {
    ...omit(user.toJSON(), [
      'password',
      '__v',
      '_id',
      'createdAt',
      'updatedAt',
    ]),
    session: session._id,
  };

  // sign a access token
  const accessJwt = signJWT(payload, {
    expiresIn: JWT_EXPIRATION,
  });

  // sign a refresh token
  const refreshJwt = signJWT(payload, {
    expiresIn: JWT_EXPIRATION_REFRESH,
  });

  res.cookie('accessToken', accessJwt, {
    maxAge: 900000, // 15 minutes
    httpOnly: true,
    domain: DOMAIN,
    path: '/',
    sameSite: 'strict',
    secure: !LOCAL_DEV,
  });

  res.cookie('refreshToken', refreshJwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: DOMAIN,
    path: '/',
    sameSite: 'strict',
    secure: !LOCAL_DEV,
  });

  res.status(StatusCodes.OK).send({ accessJwt, refreshJwt });
};

const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const sessions = await findSession({ user: userId, valid: true });

  return res.send(sessions);
};

const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};

export { loginHandler, getUserSessionsHandler, deleteSessionHandler };
