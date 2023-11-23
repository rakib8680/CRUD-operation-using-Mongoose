import { z } from 'zod';

const userValidation = z.object({
  userId: z.number().positive(),
  username: z.string().max(20, 'username cannot be more than 20 characters'),
  password: z
    .string()
    .min(3, 'password must be at least 3 characters')
    .max(20, 'password cannot be more than 20 characters'),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number().positive('Age must be a positive number'),
  email: z.string().email('Please provide a valid email'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      country: z.string(),
    }),
  orders: z
    .array(
      z.object({
        productName: z.string(),
        price: z.number().positive('Price must be a positive number'),
        quantity: z.number().positive('Quantity must be a positive number'),
      }),
    )
    .optional(),
});

export default userValidation;
