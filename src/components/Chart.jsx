import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  PieChart,
  ResponsiveContainer,
  Pie,
} from "recharts";
import Collection from "./Collection";
import { useSelector } from "react-redux";
import { useGetAllDataQuery } from "../features/api/authApi";



const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle);
  const y = cy + radius * Math.sin(-midAngle);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Chart = () => {
 

  const { ward } = useSelector((state) => state.ward);
  const {data,isFetching} = useGetAllDataQuery();


  

  const wardCounts = ward?.map((w) => {
    const dataCount = data?.data?.filter((d) => d?.ward === w?.number).length;
    return { ward: w.label, সকল_খানা: dataCount };
  });

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div>
   
        <div className="sm:m-2     rounded-md flex gap-5  flex-col lg:flex-row  ">
          <ResponsiveContainer width="100%" height={355}>
            <BarChart
              className="bg-white  shadow-md py-5"
              width={700}
              height={400}
              border={1}
              data={wardCounts}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ward" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="সকল_খানা"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {wardCounts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={300}>
            <div className="p-10 bg-white  shadow-md ">
              <h1>কালেকশান</h1>
              <Collection/>
            </div>
          </ResponsiveContainer>
        </div>
    
    </div>
   
  );
};

export default Chart;
