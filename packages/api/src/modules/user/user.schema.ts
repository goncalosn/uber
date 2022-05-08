import { registerUserSchema } from '@uber/interfaces';
import { TypeOf } from 'zod';

export type RegisterUserBody = TypeOf<typeof registerUserSchema>;
