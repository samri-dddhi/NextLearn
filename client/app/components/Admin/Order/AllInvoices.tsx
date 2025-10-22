import React, {useState, useEffect} from 'react'
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { useTheme } from 'next-themes';
import { useGetAllCoursesQuery } from '../../../../redux/features/courses/coursesApi';
import { useGetAllOrdersQuery } from '../../../../redux/features/orders/ordersApi';
import { useGetAllUsersQuery } from '../../../../redux/features/user/userApi';
import Loader from '../../Loader/Loader';
import {format} from "timeago.js";
import { AiOutlineMail } from 'react-icons/ai';
type Props = {
    isDashboard?: boolean;
}

const AllInvoices = ({isDashboard}: Props) => {
  const { data, isLoading } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const { theme, setTheme } = useTheme({});

  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    if (data){
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find((user: any) => user._id === item.userId);
      const course = coursesData?.courses.find((course: any) => course._id === item.courseId);
      
      return {
        ...item,
        userName: user?.name,
        userEmail: user?.email,
        title: course?.name,
        price: "$" + course?.price,
      };
    });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  const columns: any = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3
    },
    {
      field: "userName",
      headerName: "Name",
      flex: isDashboard ? 0.6 : 0.5
    },
    ...(isDashboard
      ? []
      : [
          {
            field: "userEmail",
            headerName: "Email",
            flex: 1,
          },
          {
            field: "title",
            headerName: "Course Title",
            flex: 1,
          },
        ]),
          {
            field: "price",
            headerName: "Price",
            flex: 0.5,
          },
          ...(isDashboard
      ? [   
          {
            field: "createdAt",
            headerName: "Created At",
            flex: 0.5,
          },
        ]
        : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.userEmail}`}>
                  <AiOutlineMail size={20} className={theme === "dark" ? "text-white":"text-black"} />
                </a>
              );
            }
          }
        ]),
  ];

  const rows: any = [
    //mock data
    {
      id: "1",
      userName: "John Doe",
      userEmail: "john@example.com",
      title: "Course Title",
      price: "$100",
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      userName: "Jane Smith",
      userEmail: "jane@example.com",
      title: "Course Title",
      price: "$100",
      createdAt: new Date().toISOString()
    },
    {
      id: "3",
      userName: "Bob Johnson",
      userEmail: "bob@example.com",
      title: "Course Title",
      price: "$100",
      createdAt: new Date().toISOString()
    },
    {
      id: "4",
      userName: "Alice Williams",
      userEmail: "alice@example.com",
      title: "Course Title",
      price: "$100",
      createdAt: new Date().toISOString()
    },
    {
      id: "5",
      userName: "Michael Brown",
      userEmail: "michael@example.com",
      title: "Course Title",
      price: "$100",
      createdAt: new Date().toISOString()
    }
  ];

  orderData &&
  orderData.forEach((item: any) => {
    rows.push({
      id: item._id,
      userName: item.userName,
      userEmail: item.userEmail,
      title: item.title,
      price: item.price,
      createdAt: item.createdAt,
    });
  });

  return (
   <div className={isDashboard ? "":"mt-[20px] "}>
    {
      isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0":"40px"}>
       <Box
  m={isDashboard ? "0" : "20px 0 0 0"}
  height={isDashboard ? "35vh" : "88vh"}
  overflow={"hidden"}
  sx={{
    "& .MuiDataGrid-root": {
      border: "none",
      outline: "none",
      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: theme === "dark" ? 
        "0 10px 30px rgba(0, 0, 0, 0.3)" : 
        "0 10px 30px rgba(0, 0, 0, 0.1)",
    },
    "& .MuiDataGrid-columnHeaders": {
      background: theme === "dark" ? 
        "linear-gradient(135deg, #374151 0%, #4b5563 100%)" : 
        "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      color: "#f0f0f0",
      borderBottom: "none",
      fontWeight: "700",
      fontSize: "0.875rem",
      minHeight: "60px !important",
      borderRadius: "16px 16px 0 0",
    },
    "& .MuiDataGrid-columnHeader": {
      backgroundColor: "transparent",
    },
    "& .MuiDataGrid-row": {
      backgroundColor: theme === "dark" ? "#334155" : "#f8fafc",
      color: theme === "dark" ? "#ffffff" : "#1e293b",
      borderBottom: theme === "dark" ? 
        "1px solid rgba(148, 163, 184, 0.2) !important" : 
        "1px solid rgba(148, 163, 184, 0.15) !important",
      "&:hover": {
        backgroundColor: theme === "dark" ? 
          "rgba(59, 130, 246, 0.25) !important" : 
          "rgba(59, 130, 246, 0.08) !important",
        transform: "translateY(-1px)",
        boxShadow: theme === "dark" ? 
          "0 6px 20px rgba(59, 130, 246, 0.3)" : 
          "0 6px 20px rgba(59, 130, 246, 0.15)",
        transition: "all 0.3s ease-in-out",
      },
      "&.Mui-selected": {
        backgroundColor: theme === "dark" ? 
          "rgba(34, 197, 94, 0.3) !important" : 
          "rgba(34, 197, 94, 0.1) !important",
        "&:hover": {
          backgroundColor: theme === "dark" ? 
            "rgba(34, 197, 94, 0.4) !important" : 
            "rgba(34, 197, 94, 0.15) !important",
        },
      },
      transition: "all 0.3s ease-in-out",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none !important",
      padding: "16px",
      fontSize: "0.875rem",
      fontWeight: "500",
      color: theme === "dark" ? "#f1f5f9" : "#374151",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
    },
    "& .MuiDataGrid-footerContainer": {
      // background: theme === "dark" ? 
      //   "linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%)" : 
      //   "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
      borderTop: "none",
      color: "#ffffff",
      borderRadius: "0 0 16px 16px",
      minHeight: "56px",
      "& .MuiTablePagination-root": {
        color: "#ffffff",
      },
      "& .MuiTablePagination-selectIcon": {
        color: "#ffffff",
      },
      "& .MuiIconButton-root": {
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.15)",
        },
      },
    },
    "& .MuiDataGrid-sortIcon": {
      color: theme === "dark" ? "#93c5fd" : "#3b82f6",
    },
    "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
      color: theme === "dark" ? "#f1f5f9" : "#374151",
    },
    "& .MuiCheckbox-root": {
      color: theme === "dark" ? "#06b6d4" : "#0891b2",
      "&.Mui-checked": {
        color: theme === "dark" ? "#10b981" : "#059669",
      },
      "&:hover": {
        backgroundColor: theme === "dark" ? 
          "rgba(6, 182, 212, 0.1)" : 
          "rgba(8, 145, 178, 0.08)",
      },
    },
    "& .MuiDataGrid-toolbarContainer": {
      backgroundColor: theme === "dark" ? "#334155" : "#f8fafc",
      borderBottom: theme === "dark" ? 
        "1px solid rgba(148, 163, 184, 0.2)" : 
        "1px solid rgba(148, 163, 184, 0.15)",
      padding: "16px",
      "& .MuiButton-text": {
        color: theme === "dark" ? "#60a5fa" : "#3b82f6",
        fontWeight: "600",
        "&:hover": {
          backgroundColor: theme === "dark" ? 
            "rgba(96, 165, 250, 0.1)" : 
            "rgba(59, 130, 246, 0.08)",
        },
      },
    },
    "& .MuiDataGrid-overlay": {
      backgroundColor: theme === "dark" ? 
        "rgba(30, 41, 59, 0.95)" : 
        "rgba(248, 250, 252, 0.95)",
      color: theme === "dark" ? "#ffffff" : "#1e293b",
    },
    "& .MuiDataGrid-columnSeparator": {
      color: theme === "dark" ? 
        "rgba(148, 163, 184, 0.3)" : 
        "rgba(148, 163, 184, 0.2)",
    },
  }}

>
  <DataGrid
    rows={rows}
    columns={columns}
    components={isDashboard ? {} : { Toolbar: GridToolbar }}
    checkboxSelection={isDashboard ? false : true}
  />
</Box> 
</Box>
      )
    }
   </div>
  )
}

export default AllInvoices;