import { Model } from 'mongoose';

export type IUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: {
    productName: string;
    price: number;
    quantity: number;
  }[];
};

// Instance method for if a users exist or not in the database
export type UserMethods = {
  isUserExist(userId: number): Promise<IUser | null>;
};

export type UserModel = Model<IUser, Record<string, never>, UserMethods>;
