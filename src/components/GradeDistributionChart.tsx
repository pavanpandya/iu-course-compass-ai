import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts/lib/index.js";
import { GradeDistribution } from "@/data/mockData";

interface GradeDistributionChartProps {
  grades: GradeDistribution;
}

const GradeDistributionChart: FC<GradeDistributionChartProps> = ({ grades }) => {
  // Transform grade distribution object into array format for recharts
  const data = Object.entries(grades).map(([grade, count]) => ({
    grade,
    count,
  }));

  // Custom colors for grade bars
  const getBarColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "#4CAF50";
      case "B":
        return "#8BC34A";
      case "C":
        return "#FFC107";
      case "D":
        return "#FF9800";
      case "F":
        return "#F44336";
      case "Withdraw":
        return "#9E9E9E";
      default:
        return "#990000";
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="grade" />
        <YAxis />
        <Tooltip
          formatter={(value) => [`${value} students`, "Count"]}
          labelFormatter={(label) => `Grade: ${label}`}
        />
        <Bar dataKey="count" name="Students" fill="#8884d8" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getBarColor(entry.grade)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GradeDistributionChart;
