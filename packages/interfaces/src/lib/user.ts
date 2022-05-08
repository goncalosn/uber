import { object, string } from 'zod';

const registerUserSchema = object({
  username: string({ required_error: 'Username is required' }),
  email: string({ required_error: 'Email is required' }).email(
    'Please insert a valid email'
  ),
  password: string({ required_error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long')
    .max(64, 'Password cannot be longer than 64 characters'),
  confirmPassword: string({
    required_error: 'Password confirmation is required',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export { registerUserSchema };
