"use client";
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, TextField, InputAdornment, Chip } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2, FiSearch, FiFilter, FiPlus } from "react-icons/fi";
import { BsStarFill } from "react-icons/bs";
import { useGetAllCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import {format} from "timeago.js"

const AllCourses = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading } = useGetAllCoursesQuery({});

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
          <span className="font-semibold">{Number(params.value).toFixed(1)}</span>
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
      field: "actions",
      headerName: "Actions",
      flex: 0.6,
      sortable: false,
      headerAlign: "center" as const,
      align: "center" as const,
      renderCell: () => (
        <div className="flex items-center space-x-3 ml-6">
          <Button
            size="small"
            sx={{
              minWidth: "auto",
              width: 32,
              height: 32,
              borderRadius: "8px",
              backgroundColor: theme === "dark" ? "#059669" : "#10b981",
              color: "#fff",
              "&:hover": {
                backgroundColor: theme === "dark" ? "#047857" : "#059669",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            <FiEdit2 size={16} />
          </Button>
          <Button
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
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      title: "React Complete Guide",
      ratings: 4.8,
      purchased: 1250,
      created_at: "2023-10-01",
    },
    {
      id: 2,
      title: "Node.js Masterclass",
      ratings: 4.6,
      purchased: 987,
      created_at: "2023-09-15",
    },
    {
      id: 3,
      title: "Next.js Full Stack",
      ratings: 4.9,
      purchased: 2156,
      created_at: "2023-08-20",
    },
    {
      id: 4,
      title: "TypeScript Advanced",
      ratings: 4.7,
      purchased: 743,
      created_at: "2023-07-10",
    },
    {
      id: 5,
      title: "MongoDB Essentials",
      ratings: 4.4,
      purchased: 654,
      created_at: "2023-06-25",
    },
  ];
  if (data && Array.isArray(data.courses)) {
    data.courses.forEach((item) => {
      rows.push({
        id: item._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: item.createdAt || item.created_at
      });
    });
  }

  return (
    <div className="mt-[120px] ml-10">
     {
      isLoading ? (
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
                backgroundColor: theme === "dark" ? "#475569 !important" : "#f1f5f9 !important",
              },
              "&.Mui-selected": {
                backgroundColor: theme === "dark" ? "#374151 !important" : "#e0e7ff !important",
                "&:hover": {
                  backgroundColor: theme === "dark" ? "#4b5563 !important" : "#c7d2fe !important",
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
                theme === "dark" ? "#60a5fa !important" : "#2563eb !important",
            },
            "& .MuiDataGrid-sortIcon": {
              color: theme === "dark" ? "#f9fafb" : "#111827",
            },
          }}
        >
          <DataGrid checkboxSelection rows={rows} columns={columns} />
        </Box>
      </Box>
      )
     }
    </div>
  );
};

export default AllCourses;
