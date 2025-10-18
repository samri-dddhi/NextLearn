"use client";
import React, { FC, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Chip, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { FiPlus, FiUserPlus } from "react-icons/fi";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { useGetAllUsersQuery } from "../../../../redux/features/user/userApi";

type Props = {
  isTeam: boolean;
};

const AllCourses: FC<Props> = ({ isTeam }: Props) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
    const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const { data, error, isLoading } = useGetAllUsersQuery({});


  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
      headerAlign: "center" as const,
      align: "center" as const,
    },
    {
      field: "name",
      headerName: "Name",
      flex: .6,
      headerAlign: "center" as const,
      renderCell: (params: any) => (
        <div className="flex items-center space-x-2">
          <span className="font-medium">{params.value}</span>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center" as const,
      flex: 1,
      renderCell: (params: any) => (
        <div className="flex items-center space-x-1">
          <span className="font-semibold">{params.value}</span>
        </div>
      ),
    },
    {
      field: "role",
      headerName: "Role",
    //   headerAlign: "center" as const,
      flex: 0.3,
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
      field: "courses",
      headerName: "Purchased Courses",
      headerAlign: "center" as const,
      flex: 0.5,
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
      field: "created_at",
      headerName: "Joined At",
      headerAlign: "center" as const,
      flex: 0.5,
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
      flex: 0.5,
      sortable: false,
      headerAlign: "center" as const,
      align: "center" as const,
      renderCell: (params:any) => (
        <div className="flex items-center space-x-1 mt-3 ml-5">
         <Button
        onClick={() => {
            setOpen(!open);
            setUserId(params.row.id);
        }}
        >
            <AiOutlineDelete size={20} className="text-red-600" />
       </Button>
          <a
            href={`mailto:${'params.row.email'}`}
          >
            <AiOutlineMail size={16} 
            className="text-blue-600"
            />
          </a>
        </div>
      ),
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData = data && data?.users.filter((item:any) => item.role== "admin");
    if (newData && Array.isArray(newData)) {
      newData.forEach((item) => {
        rows.push({
          id: item.id,
          name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: item.createdAt || item.created_at,
      });
    });
  }
  }
  else{
     if (data && Array.isArray(data.users)) {
    data.users.forEach((item) => {
      rows.push({
        id: item.id,
        name: item.name,
        email: item.email,
        role: item.role,
        courses: item.courses.length,
        created_at: item.createdAt || item.created_at,
      });
    });
  }
}

  return (
    <div className="mt-[120px] ml-10">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
            <div className="w-full flex justify-end mb-6">
                <button 
                    className={`
                        flex items-center space-x-2 px-6 py-3 rounded-lg font-medium
                        transition-all duration-200 ease-in-out transform
                        ${theme === "dark" 
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" 
                            : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                        }
                        hover:scale-105 hover:shadow-lg
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        active:scale-95
                    `}
                    onClick={() =>  setActive(!active)}
                >
                    <FiUserPlus size={18} />
                    <span>Add New Member</span>
                </button>
            </div>
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
        </Box>
      )}
    </div>
  );
};


export default AllCourses;
