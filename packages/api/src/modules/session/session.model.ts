import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from '../user/user.model';

export class Session {
  @prop({ req: true, ref: () => User })
  public user: Ref<User>;

  @prop({ req: true, default: true })
  public valid: boolean;

  @prop({ req: true })
  public userAgent: string;
}

export const SessionModel = getModelForClass(Session, {
  schemaOptions: { timestamps: true },
});
