import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/orderModel";

import { Request, Response, NextFunction } from "express";

export const newOrder = catchAsyncErrors(async (data:any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
  
      res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
          });
});

export const getAllOrdersService = async (res: Response) => {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        orders,
    });
}
