import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Report } from "../types/formTypes";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ReportStatisticsGraphProps {
  reports: Report[];
  metric: string;
}

const ReportStatisticsGraph: React.FC<ReportStatisticsGraphProps> = ({
  reports,
  metric,
}) => {
  const data = {
    labels: reports.map((report) =>
      new Date(report.createdAt!).toLocaleDateString()
    ),
    datasets: [
      {
        label: metric,
        data: reports.map((report) =>
          parseFloat(report.bodyFatDetails[metric])
        ),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return <Line data={data} />;
};

export default ReportStatisticsGraph;
