import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../modules/session/session.utils';
import { reIssueAccessToken } from '../modules/session/session.service';
import { DEV, DOMAIN } from '../utils/constants';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ''
  ).replace(/^Bearer\s/, '');

  const refreshToken = req.cookies.refreshToken || req.get('x-refresh');

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded; //same as res.user
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);

      res.cookie('accessToken', newAccessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: DOMAIN,
        path: '/',
        sameSite: 'strict',
        secure: !DEV,
      });
    }

    const result = verifyJwt(newAccessToken as string);

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
