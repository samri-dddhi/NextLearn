import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Label,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";
import { styles } from "@/app/styles/style";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  // const analyticsData=[
  //     { name: "June 2025", uv: 3 },
  //     { name: "July 2025", uv: 5 },
  //     { name: "August 2025", uv: 2 },
  //     { name: "September 2025", uv: 8 },
  //     { name: "October 2025", uv: 6 },
  //     { name: "November 2025", uv: 4 },
  //     { name: "December 2025", uv: 7 },
  // ];

  const analyticsData: { name: string; uv: number }[] = [];
  if (data && data.courses?.last12Months) {
    data.courses.last12Months.forEach(
      (item: { month: string; count: number }) => {
        analyticsData.push({
          name: item.month,
          uv: item.count,
        });
      }
    );
  }
  const minValue = 0;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Course Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 6 months analytics data{" "}
            </p>
          </div>
          <div className="w-full h-[90%] flex justify-center items-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart data={analyticsData} width={150} height={300}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#8884d8">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
