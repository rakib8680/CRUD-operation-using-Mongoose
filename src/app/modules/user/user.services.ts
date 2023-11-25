import { IOrder, IUser } from './user.interface';
import { userModel } from './user.model';

// create user
const createUserToDB = async (userData: IUser) => {
  const user = new userModel(userData); //this is an instance of the model

  if (await user.isUserExist(userData.userId)) {
    throw new Error('User already exist');
  }
  const result = await user.save();
  return result;
};

// Retrieve all users
const getAllUsersFromDB = async () => {
  const result = await userModel.aggregate([]).project({
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
const getSpecificUserFromDB = async (userId: number) => {
  const result = await userModel.findOne({ userId });
  return result;
};

// update a users information
const updateUser = async (
  userId: number,
  data: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await userModel.findOneAndUpdate({ userId }, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

// delete a user
const deleteUser = async (userId: number) => {
  const result = await userModel.findOneAndDelete({ userId });
  return result;
};

// create an order
const createOrder = async (userId: number, orderData: IOrder) => {
  const result = await userModel.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: orderData,
      },
    },
  );
  return result;
};

// retrieve all orders
const getAllOrders = async (userId: number) => {
  const result = await userModel
    .findOne({ userId })
    .select({ orders: 1, _id: 0 });
  return result;
};

// Calculate total price
const calculateTotalPrice = async (userId: number) => {
  const result = await userModel.aggregate([
    // stage 1
    {
      $match: {
        userId: userId,
      },
    },

    // stage 2
    { $unwind: '$orders' },

    // stage 3
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'],
          },
        },
      },
    },

    // stage 4
    {
      $project: { _id: 0, totalPrice: 1 },
    },
  ]);

  return result[0];
};

export const userServices = {
  createUserToDB,
  getAllUsersFromDB,
  getSpecificUserFromDB,
  updateUser,
  deleteUser,
  createOrder,
  getAllOrders,
  calculateTotalPrice,
};
