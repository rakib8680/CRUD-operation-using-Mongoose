import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';

// create schema
const userSchema = new Schema<IUser>({
  userId: { type: Number, unique: true, required: [true, 'UserId is required'], trim: true },
  username: { type: String, unique: true, required: [true, 'Username is required'] },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String , required: true},
  },
  age: { type: Number },
  email: { type: String, required:[true, 'Please Provide your email'] },
  isActive: { type: Boolean, default: true },
  hobbies: { type: [String] },
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});




// create model 
export const userModel = model<IUser>('User', userSchema);
