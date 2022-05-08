import { sign, verify } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../../utils/constants';

const signJWT = (payload: string | Buffer | object) => {
  return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

const verifyJWT = (token: string) => {
  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
  } catch (e) {
    return e;
  }
};

export { signJWT, verifyJWT };
