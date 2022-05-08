import bcrypt from 'bcrypt';
import { getModelForClass, prop, pre } from '@typegoose/typegoose';
import { SALT_ROUNDS } from '../../utils/constants';

@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hash;
    return next();
  }
})
export class User {
  @prop({ req: true, unique: true })
  public username: string;

  @prop({ req: true, unique: true })
  public email: string;

  @prop({ req: true })
  public password: string;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
