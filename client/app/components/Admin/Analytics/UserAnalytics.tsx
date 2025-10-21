import React,{FC} from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetUsersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import { styles } from "../../../../app/styles/style";


type Props = {
    isDashboard?: boolean;
}
// const analyticsData=[
//     { name: "January 2025", count: 30 },
//     { name: "February 2025", count: 50 },
//     { name: "March 2025", count: 20 },
//     { name: "April 2025", count: 40 },
//     { name: "May 2025", count: 60 },
//     { name: "June 2025", count: 80 },
//     { name: "July 2025", count: 100 },
//     { name: "August 2025", count: 70 },
//     { name: "September 2025", count: 90 },
//     { name: "October 2025", count: 110 },
//     { name: "November 2025", count: 130 },
//     { name: "December 2025", count: 150 },
// ];

const UserAnalytics = ({ isDashboard }: Props) => {
    const { data, isLoading } = useGetUsersAnalyticsQuery({});
    const analyticsData: any = [];
    data &&
      data.users.last12Months.forEach((item: any) => {
        analyticsData.push({
          name: item.month,
          count: item.count,
        });
        });
  return (
<>
{
    isLoading ? (
        <Loader />
    ) : (
        <div className={isDashboard ? "w-full h-72":"h-screen"}>
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
                User Analytics
            </h1>
            {
                !isDashboard && (
                    <p className={`${styles.label} px-5`}>
                    Last 12 months analytics data{" "}
                  </p>
                )}
            </div>
            <div className="w-full h-[90%] flex justify-center items-center">
                <ResponsiveContainer width={isDashboard ? "100%":"90%"} height={isDashboard ? 200 : "50%"}>
                <AreaChart data={analyticsData} width={150} height={300} >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
                </ResponsiveContainer>
            </div>
          </div>
    )
}
</>
  )
}

export default UserAnalytics