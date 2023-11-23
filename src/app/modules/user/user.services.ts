import { IUser } from './user.interface';
import { userModel } from './user.model';

const createUserToDB = async (userData: IUser) => {
  // create user
  const result = await userModel.create(userData);
  return result;
};

// Retrieve all users
const getAllUsersFromDB = async () => {
  const result = await userModel.find();
  return result;
};

// Retrieve a specific user
const getSpecificUserFromDB = async (id: number) => {
  const result = await userModel.findOne({ id });
  return result;
};

// update a users information
const updateUser = async (id: number) => {
  const result = await userModel.findOneAndUpdate({ id });
  return result;
};

// delete a user
const deleteUser = async (id: number) => {
  const result = await userModel.findOneAndDelete({ id });
  return result;
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSpecificUserFromDB,
  updateUser,
  deleteUser
};
