import express from 'express';
import { loginUser, registrationUser } from '../controllers/user.controller';
import { activateUser } from '../controllers/user.controller';
    
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);

export default userRouter;
