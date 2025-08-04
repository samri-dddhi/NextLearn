import { Request, Response , NextFunction} from "express";
import { catchAsyncErrors } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";

export const isAuthenticated = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return next(new ErrorHandler("Login to access this resource", 400));
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET as string) as JwtPayload;
 if (!decoded) {
        return next(new ErrorHandler("Invalid access token", 400));
    }
    const user = await redis.get(decoded.id);
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }

    req.user = JSON.parse(user);
    next();
})

