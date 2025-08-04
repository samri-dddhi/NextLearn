import {Request , Response , NextFunction} from 'express';
import userModel, { IUser } from '../models/user.model';
import ErrorHandler from '../utils/ErrorHandler';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors';
import jwt, { Secret } from 'jsonwebtoken';
require('dotenv').config();
import ejs from 'ejs';
import path from 'path';
import sendMail from '../utils/sendMail';

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

    