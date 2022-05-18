import { FilterQuery, UpdateQuery } from 'mongoose';
import { Session, SessionModel } from './session.model';
import { UserModel } from '../user/user.model';
import { verifyJwt, signJWT } from './session.utils';

const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
};

const findSession = async (query: FilterQuery<Session>) => {
  return SessionModel.find(query).lean();
};

const updateSession = async (
  query: FilterQuery<Session>,
  update: UpdateQuery<Session>
) => {
  return SessionModel.updateOne(query, update);
};

const reIssueAccessToken = async (refreshToken: string) => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !decoded.session) return false;

  const session = await SessionModel.findById(decoded.session);

  if (!session || !session.valid) return false;

  const user = await UserModel.findById(session.user);

  if (!user) return false;

  const accessToken = signJWT(
    { ...user, session: session._id },
    { expiresIn: 90000 } // 15 minutes
  );

  return accessToken;
};

export { createSession, findSession, updateSession, reIssueAccessToken };
