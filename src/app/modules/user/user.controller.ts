import { Request, Response } from 'express';
import { userServices } from './user.services';
import userValidation from './user.validation';

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'No user created!',
      error,
    });
  }
};

export const userControllers = {
  createUser,
};
