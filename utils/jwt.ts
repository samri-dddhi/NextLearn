require("dotenv").config();
import {Response} from "express";
import {IUser} from "../models/user.model";
import {redis} from "./redis";

interface ITokenOptions{
    expires : Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}
export const sendToken = (
    user: IUser,
    statusCode: number,
    res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    redis.set((user.id), JSON.stringify(user) as any);

    const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE 
        || '300', 10);
    const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE
        || '1200', 10);

        const accessTokenOptions: ITokenOptions = {
            expires: new Date(Date.now() + accessTokenExpire * 1000),
            maxAge: accessTokenExpire * 1000,
            httpOnly: true,
            sameSite: 'lax',
        }

        const refreshTokenOptions: ITokenOptions = {
            expires: new Date(Date.now() + refreshTokenExpire * 1000),
            maxAge: refreshTokenExpire * 1000,
            httpOnly: true,
            sameSite: 'lax',
        }

        if(process.env.NODE_ENV === "production") {
            accessTokenOptions.secure = true;
            refreshTokenOptions.secure = true;
        }
console.log("AccessToken:", accessToken);
console.log("RefreshToken:", refreshToken);
console.log("Access Token Options:", accessTokenOptions);
console.log("Refresh Token Options:", refreshTokenOptions);
console.log("NODE_ENV:", process.env.NODE_ENV);

        res.cookie("accessToken", accessToken, accessTokenOptions);
        res.cookie("refreshToken", refreshToken, refreshTokenOptions);

        res.status(statusCode).json({
            success: true,
            data: {
                user,
                accessToken,
                // refreshToken
            }
        });
    }