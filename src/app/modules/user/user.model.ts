import { model, Schema } from 'mongoose';
import { IUser, UserMethods, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

// create schema
const userSchema = new Schema<IUser, UserModel, UserMethods>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'UserId is required'],
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'Username is required'],
  },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number },
  email: { type: String, required: [true, 'Please Provide your email'] },
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

// pre hook to hash password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

// post hook to remove password field
userSchema.post('save', function (doc, next) {
  if (doc) {
    doc.password = '';
    // delete doc.password;
  }
  next();
});

// create methods
userSchema.methods.isUserExist = async function (userId: number) {
  const existingUser = await userModel.findOne({ userId });
  return existingUser;
};

// create model
export const userModel = model<IUser, UserModel>('User', userSchema);
