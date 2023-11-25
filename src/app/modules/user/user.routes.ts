import express from 'express';
import { userControllers } from './user.controller';

const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUsers);
router.get('/:userId', userControllers.getSingleUser);
router.put('/:userId', userControllers.updateUser);
router.delete('/:userId',userControllers.deleteUser);
router.put('/:userId/orders', userControllers.createOrder);
router.get('/:userId/orders', userControllers.getAllOrders);

export const userRoute = router;
