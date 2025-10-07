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
    getCourses: builder.query({
      query: () => ({
        url: "/get-courses",
      }),
      providesTags: ["Courses"],
    }),
    getCourseById: builder.query({
      query: (id) => ({
        url: `/get-course/${id}`,
      }),
      providesTags: ["Courses"],
    }),         
    updateCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/edit-course/${id}`,  
        method: "PUT",
        body: { data },
        credentials: "include" as const,    
        }),
        invalidatesTags: ["Courses"],
    }),
    deleteCourse: builder.mutation({
        query: (id) => ({
            url: `/delete-course/${id}`,
            method: "DELETE",
            credentials: "include" as const,
        }),

        invalidatesTags: ["Courses"],
    }),
    }), 
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
