import { object, string } from 'zod';

const loginSchema = object({
  email: string({ required_error: 'Email is required' }).email(
    'Please insert a valid email'
  ),
  password: string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long')
    .max(64, 'Password cannot be longer than 64 characters'),
});

export { loginSchema };
