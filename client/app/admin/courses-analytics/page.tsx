"use client";
import React from "react";
import Heading from "../../utils/Heading";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
// import AdminProtected from '../../hooks/adminProtected'
import DashboardHero from "../../components/Admin/DashboardHero";
import CourseAnalytics from "../../components/Admin/Analytics/CourseAnalytics";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title={`Admin Panel - NextLearn`}
        description="Manage users, courses, and content on the NextLearn platform."
        keywords="Admin, Dashboard, User Management, Course Management"
      />
      <div className="flex h-screen">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[84%]">
          <DashboardHero />
          <CourseAnalytics />
        </div>
      </div>
    </div>
  );
};

export default page;
