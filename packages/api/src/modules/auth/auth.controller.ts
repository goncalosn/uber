import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { DOMAIN, LOCAL_DEV } from '../../utils/constants';
import { findUserByEmail } from '../user/user.service';
import { signJWT } from './auth.utils';
import omit from '../../helpers/omit';
import { LoginBody } from './auth.schema';

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

  // sign a jwt token
  const payload = omit(user.toJSON(), ['password', '__v']);
  const jwt = signJWT(payload);

  // add a cookie to the response
  res.cookie('accessToken', jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: DOMAIN,
    path: '/',
    sameSite: 'strict',
    secure: !LOCAL_DEV,
  });

  res.status(StatusCodes.OK).send(jwt);
};

export { loginHandler };
