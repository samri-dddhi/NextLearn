require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {errorMiddleware} from './middleware/error';
import userRouter from './routes/user.routes';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';

app.use(express.json({limit: '50mb'}));

app.use(cookieParser());

app.use(cors({
  origin: process.env.ORIGIN ,
  credentials:true
}));

app.use("/api/v1", userRouter, courseRouter, orderRouter);

// Uncomment the following lines if you want to add a test route or error handling
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "Server is running"
  });
});
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(errorMiddleware);

// app.get("/test", (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is running"
//   });
// });

// app.get("/test", (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json({
//     success: true,
//     message: "Server is running"
//   });
// });
//   });
// });

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//     const err = new Error(`Route ${req.originalUrl} not found`) as any;
//  err.statusCode = 404;
//     next(err);
//   });
