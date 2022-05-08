import { User, UserModel } from './user.model';

const createUser = async (user: Omit<User, 'comparePassword'>) => {
  return UserModel.create(user);
};

const findUserByEmail = async (email: User['email']) => {
  return UserModel.findOne({
    email,
  });
};

export { createUser, findUserByEmail };
