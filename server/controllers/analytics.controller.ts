import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import UserModel from "../models/user.model"; // Adjust the import path as necessary
import CourseModel from "../models/course.model";
import OrderModel from "../models/orderModel";
//get users analytics

export const getUsersAnalytics = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthsData(UserModel);
      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      next(new ErrorHandler("Failed to get user analytics", 500));
    }
  }
);

export const getCoursesAnalytics = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthsData(CourseModel);
      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error) {
      next(new ErrorHandler("Failed to get course analytics", 500));
    }
  }
);

export const getOrdersAnalytics = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthsData(OrderModel);
      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      next(new ErrorHandler("Failed to get order analytics", 500));
    }
  }
);

