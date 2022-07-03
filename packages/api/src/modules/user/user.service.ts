import { User, UserModel } from './user.model';

const createUser = async (user: Omit<User, 'comparePassword'>) =>
  UserModel.create(user);

const findUserByEmail = async (email: User['email']) =>
  UserModel.findOne({
    email,
  });

export { createUser, findUserByEmail };
