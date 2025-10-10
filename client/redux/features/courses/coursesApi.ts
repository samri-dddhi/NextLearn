import { create } from "domain";
import { apiSlice } from "../api/apiSlice";

const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "/get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseById: builder.query({
      query: (id) => ({
        url: `/get-course/${id}`,
      }),
    }),         
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit-course/${id}`,  
        method: "PUT",
        body: { data },
        credentials: "include" as const,    
        }),
    }),
    deleteCourse: builder.mutation({
        query: (id) => ({
            url: `/delete-course/${id}`,
            method: "DELETE",
            credentials: "include" as const,
        }),
    }),
    }), 
});

export const {
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
