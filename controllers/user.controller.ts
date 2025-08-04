import {Request , Response , NextFunction} from 'express';
import userModel, { IUser } from '../models/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors';
import jwt, { Secret } from 'jsonwebtoken';
require('dotenv').config();
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail';
import {sendToken} from '../utils/jwt';
import { redis } from '../utils/redis';

interface IRegistrationBody {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export const registrationUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try{
const { name, email, password } = req.body;

const isEmailExists = await userModel.findOne({ email });
if (isEmailExists) {
    return next(new ErrorHandler("Email already exists", 400));
}

const user : IRegistrationBody = {
    name,
    email,
    password
};
const activationToken = createActivationToken(user);

const activationCode = activationToken.activationCode;

const data = { user : {name: user.name}, activationCode };
const html = await ejs.renderFile(
    path.join(__dirname, "../mails/activation-mail.ejs" ),
    data
);
try{
    await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data,
    });
 res.status(201).json({
        success: true,
        message: "Registration successful, please check your email to activate your account",
        activationToken: activationToken.token

    });
} catch (error:any) {
    return next(new ErrorHandler(error.message, 400));
}
}

    catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
    }
});
interface IActivationToken {
    token: string;
    activationCode: string;
}

export const createActivationToken=(user:any): IActivationToken => {
    const activationCode = Math.floor(1000+ Math.random() * 9000).toString();

    const token= jwt.sign(
        {
            user, activationCode
        },
        process.env.ACTIVATION_SECRET as Secret, {
            expiresIn: '5m'
        }
    );

    return {
        token,
        activationCode
    };
}

interface IActivationRequest {
    activation_token: string;
    activation_code : string;
}
export const activateUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try{
    const { activation_token, activation_code } = req.body as IActivationRequest;

    const { user, activationCode } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
    ) as { user: IUser; activationCode: string };
    const newUser = { user, activationCode };

    if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
    }
    const {name, email, password} = newUser.user;
    const userExists = await userModel.findOne({ email });
    if (userExists) {
        return next(new ErrorHandler("User already exists", 400));
    }
    const createdUser = await userModel.create({
        name,
        email,
        password
    });
    res.status(201).json({
        success: true,
        message: "User activated successfully",
        user: createdUser
    });
}
    catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

    interface ILoginRequest {
    email: string;
    password: string;
}
export const loginUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as ILoginRequest;

        if(!email || !password) {
            return next(new ErrorHandler("Email and password are required", 400));
        }

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }
      sendToken(user, 200, res);
        // const accessToken = user.SignAccessToken();
        // const refreshToken = user.SignRefreshToken();

        // res.status(200).json({
        //     success: true,
        //     message: "Login successful",
        //     accessToken,
        //     refreshToken,
        //     user
        // });
      

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
    }
});

export const logoutUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });
        const userId = req.user?.id || '';
        await redis.del(userId);

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
    }
});