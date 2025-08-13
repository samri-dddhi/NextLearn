import {Response} from 'express';
import CourseModel from '../models/course.model';
import { catchAsyncErrors } from '../middleware/catchAsyncErrors';

// export const createCourse = catchAsyncErrors(
//   async (req: Request, res: Response) => {
//     const course = await CourseModel.create(req.body);
//     res.status(201).json({
//       success: true,
//       course
//     });
//   }
// );
export const createCourse = async (data:any) => {
  // Do not send any response here; just create and return
  const course = await CourseModel.create(data);
  return course;
};
