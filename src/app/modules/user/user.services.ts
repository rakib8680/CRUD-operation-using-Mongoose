import { IUser } from './user.interface';
import { userModel } from './user.model';

const createUserToDB = async (userData: IUser) => {
  // create user
  const result = await userModel.create(userData);
  return result;
};

// Retrieve all users
const getAllUsersFromDB = async () => {
  const result = await userModel
    .aggregate([])
    .project({
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      _id: 0,
    });
  return result;
};

// Retrieve a specific user
const getSpecificUserFromDB = async (userId:number) => {
  const result = await userModel.findOne({userId});
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
  deleteUser,
};
