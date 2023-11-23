import { Request, Response } from 'express';
import { userServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result =await userServices.createUserToDB(user);

    res.status(201).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};



export const userControllers = {
    createUser,
}
