import express from 'express';
import { getUserInfo, loginUser, logoutUser, registrationUser, updateAccessToken, socialAuth } from '../controllers/user.controller';
import { activateUser } from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/auth';

    
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);
userRouter.post('/activate-user', activateUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', isAuthenticated , logoutUser);
userRouter.get('/refresh', updateAccessToken);
userRouter.get('/me', isAuthenticated, getUserInfo);
userRouter.post('/social-auth', socialAuth);

export default userRouter;
