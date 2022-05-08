import { loginSchema } from '@uber/interfaces';
import { TypeOf } from 'zod';

export type LoginBody = TypeOf<typeof loginSchema>;
