import { sign, SignOptions, verify } from 'jsonwebtoken';
import logger from '../../utils/logger';
import { JWT_PRIVATE, JWT_PUBLIC } from '../../utils/constants';

const signJWT = (
  payload: string | Buffer | object,
  options: SignOptions | undefined
) => {
  return sign(payload, JWT_PRIVATE, { ...options, algorithm: 'RS256' });
};

const verifyJwt = (token: string) => {
  try {
    const decoded = verify(token, JWT_PUBLIC);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    logger.error(e);
    return {
      session: null,
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
};

export { signJWT, verifyJwt };
