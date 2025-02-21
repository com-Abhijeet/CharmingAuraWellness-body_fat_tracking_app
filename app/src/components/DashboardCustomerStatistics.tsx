import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCustomerStatistics: React.FC = () => {
  const stats = useSelector(
    (state: { customers: { stats: any } }) => state.customers.stats
  );
  const [selectedDataType, setSelectedDataType] =
    useState<DataTypeKeys>("ageGroup");

  if (!stats) {
    return <p>Loading statistics...</p>;
  }

  type DataTypeKeys = "ageGroup" | "gender" | "heightRange" | "weightRange";

  const ageBreakpoints = [0, 18, 35, 50, 100];

  const formatRangeLabel = (range: any, breakpoints: number[]) => {
    if (range.min !== undefined && range.max !== undefined) {
      return `${range.min}-${range.max}`;
    }
    if (range._id !== undefined) {
      const index = breakpoints.indexOf(range._id);
      if (index !== -1 && index < breakpoints.length - 1) {
        return `${breakpoints[index]}-${breakpoints[index + 1]}`;
      }
    }
    return range._id;
  };

  const dataTypes: Record<
    DataTypeKeys,
    { labels: any; data: any; label: string; backgroundColor: string }
  > = {
    ageGroup: {
      labels: stats.customersByAgeGroup.map((group: any) =>
        formatRangeLabel(group, ageBreakpoints)
      ),
      data: stats.customersByAgeGroup.map((group: any) => group.count),
      label: "Customers by Age Group",
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
    gender: {
      labels: stats.customersByGender.map((gender: any) => gender._id),
      data: stats.customersByGender.map((gender: any) => gender.count),
      label: "Customers by Gender",
      backgroundColor: "rgba(153, 102, 255, 0.6)",
    },
    heightRange: {
      labels: stats.customersByHeightRange.map((range: any) =>
        formatRangeLabel(range, [])
      ),
      data: stats.customersByHeightRange.map((range: any) => range.count),
      label: "Customers by Height Range",
      backgroundColor: "rgba(255, 159, 64, 0.6)",
    },
    weightRange: {
      labels: stats.customersByWeightRange.map((range: any) =>
        formatRangeLabel(range, [])
      ),
      data: stats.customersByWeightRange.map((range: any) => range.count),
      label: "Customers by Weight Range",
      backgroundColor: "rgba(54, 162, 235, 0.6)",
    },
  };

  const chartData = {
    labels: dataTypes[selectedDataType].labels,
    datasets: [
      {
        label: dataTypes[selectedDataType].label,
        data: dataTypes[selectedDataType].data,
        backgroundColor: dataTypes[selectedDataType].backgroundColor,
      },
    ],
  };

  return (
    <div className="dashboard-customer-statistics">
      <h2>Customer Statistics</h2>
      <hr />
      <div className="customer-stats-container">
        <div className="chart-container">
          <label htmlFor="dataType">View : </label>
          <select
            id="dataType"
            value={selectedDataType}
            onChange={(e) =>
              setSelectedDataType(e.target.value as DataTypeKeys)
            }
          >
            <option value="ageGroup">Age Group</option>
            <option value="gender">Gender</option>
            <option value="heightRange">Height Range</option>
            <option value="weightRange">Weight Range</option>
          </select>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: dataTypes[selectedDataType].label,
                },
              },
            }}
          />
        </div>
        <div className="stats-cards">
          <div className="stats-card">
            <span>Total Customers</span>
            <strong>{stats.totalCustomers}</strong>
          </div>
          <div className="stats-card">
            <span>Average Age</span>
            <strong>{stats.averageAge.toFixed(2)}</strong>
          </div>
          <div className="stats-card">
            <span>New Customers Over Time</span>
            <ul>
              {stats.newCustomersOverTime.map((time: any) => (
                <li key={`${time._id.year}-${time._id.month}-${time._id.day}`}>
                  {time._id.year}-{time._id.month}-{time._id.day}: {time.count}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCustomerStatistics;
