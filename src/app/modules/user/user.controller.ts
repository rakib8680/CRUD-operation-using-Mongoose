import { Request, Response } from 'express';
import { userServices } from './user.services';
import userValidation from './user.validation';

// create a user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const validatedUserData = await userValidation.parse(user);
    const result = await userServices.createUserToDB(validatedUserData);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'No user created!',
      error,
    });
  }
};

// get all user
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'All users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'No user found!',
      error,
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await userServices.getSpecificUserFromDB(parseInt(userId));

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.json({
        success: false,
        message: 'User not found!',
        error: {
          status: 404,
          message: 'User not found',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found!',
      error,
    });
  }
};

// update a user data
const updateUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  const data = req.body;

  try {
    const validatedData = userValidation.parse(data);

    const result = await userServices.updateUser(userId, validatedData);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } else {
      res.json({
        success: false,
        message: 'User not found!',
        error: {
          status: 404,
          message: 'User not found',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User has not been updated!',
      error,
    });
  }
};

// delete a user
const deleteUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  try {
    const result = await userServices.deleteUser(userId);
    if(result){
      res.status(200).json({
        status:200,
        success: true,
        message: 'User deleted successfully!',
      });
    }else{
      res.json({
        success: false,
        error: {
          status: 404,
          message: 'User not found',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found!',
      error,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
