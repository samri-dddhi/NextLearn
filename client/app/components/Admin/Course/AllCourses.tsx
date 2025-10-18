"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Modal,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2, FiSearch, FiFilter, FiPlus } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import {
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
} from "../../../../redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "../../../styles/style";
import toast from "react-hot-toast";
import Link from "next/link";

const AllCourses = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { data, isLoading, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      headerAlign: "center" as const,
      align: "center" as const,
    },
    {
      field: "title",
      headerName: "Course Title",
      flex: 1.5,
      renderCell: (params: any) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium">{params.value}</span>
        </div>
      ),
    },
    {
      field: "ratings",
      headerName: "Rating",
      flex: 0.6,
      renderCell: (params: any) => (
        <div className="flex items-center space-x-1">
          <BsStarFill className="text-yellow-400" size={14} />
          <span className="font-semibold">
            {Number(params.value).toFixed(1)}
          </span>
        </div>
      ),
    },
    {
      field: "purchased",
      headerName: "Students",
      flex: 0.6,
      renderCell: (params: any) => (
        <Chip
          label={`${params.value}`}
          size="small"
          sx={{
            backgroundColor: theme === "dark" ? "#065f46" : "#d1fae5",
            color: theme === "dark" ? "#10b981" : "#059669",
            fontWeight: 600,
          }}
        />
      ),
    },
    {
      field: "created_at",
      headerName: "Created",
      flex: 0.7,
      renderCell: (params: any) => (
        <span className="text-sm text-gray-600 dark:text-gray-300">
          {params.row.isFetched
            ? format(params.value)
            : new Date(params.value).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
        </span>
      ),
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      headerAlign: "center" as const,
      align: "center" as const,
      renderCell: (params: any) => {
        return (
          <div className="ml-3 mt-4 ">
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2
                size={16}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
              />
            </Link>
          </div>
        );
      },
    },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      headerAlign: "center" as const,
      align: "center" as const,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
              size="small"
              sx={{
                minWidth: "auto",
                width: 32,
                height: 32,
                borderRadius: "8px",
                backgroundColor: theme === "dark" ? "#dc2626" : "#ef4444",
                color: "#fff",
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#b91c1c" : "#dc2626",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease-in-out",
              }}
            >
              <AiOutlineDelete size={16} />
            </Button>
          </>
        );
      },
    },
  ];
  const rows: any[] = [];
  if (data && Array.isArray(data.courses)) {
    data.courses.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: item.createdAt || item.created_at,
      });
    });
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setOpen(false);
      toast.success("Course deleted successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="mt-[120px] ml-10">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
                color: theme === "dark" ? "#f9fafb" : "#111827",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#e2e8f0" : "#f1f5f9",
                color: theme === "dark" ? "#000" : "#111827",
                fontWeight: "600",
              },
              "& .MuiDataGrid-row": {
                backgroundColor: theme === "dark" ? "#1e293b" : "#f9fafb",
                borderBottom:
                  theme === "dark" ? "1px solid #334155" : "1px solid #e2e8f0",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "#475569 !important"
                      : "#f1f5f9 !important",
                },
                "&.Mui-selected": {
                  backgroundColor:
                    theme === "dark"
                      ? "#374151 !important"
                      : "#e0e7ff !important",
                  "&:hover": {
                    backgroundColor:
                      theme === "dark"
                        ? "#4b5563 !important"
                        : "#c7d2fe !important",
                  },
                },
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#e2e8f0" : "#f1f5f9",
                color: theme === "dark" ? "#f9fafb" : "#111827",
                borderTop: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark"
                    ? "#60a5fa !important"
                    : "#2563eb !important",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#f9fafb" : "#111827",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg rounded-md p-6">
                <h1 className={`${styles.title}`}>
                  Are you sure you want to delete this course?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 space-x-4 mt-6">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7aa]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[#e53e3e]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
