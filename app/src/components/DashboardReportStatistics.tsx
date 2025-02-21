import React from "react";
import { useSelector } from "react-redux";
import { Stats } from "../types/formTypes";

const displayNames = {
  totalReports: "Total Reports",
  reportsThisMonth: "Reports This Month",
  reportsThisWeek: "Reports This Week",
  reportsToday: "Reports Today",
};

const DashboardReportStatistics: React.FC = () => {
  const stats = useSelector(
    (state: { reports: { stats: Stats | null } }) => state.reports.stats
  );

  if (!stats) {
    return <p>Loading statistics...</p>;
  }

  return (
    <div className="dashboard-statistics">
      <div className="dashboard-report-stats report-stats">
        <div className="stats-cards">
          <div className="stats-card a">
            <span>{displayNames.totalReports}</span>
            <strong>{stats.totalReports}</strong>
          </div>
          <div className="stats-card b">
            <span>{displayNames.reportsThisMonth}</span>
            <strong>{stats.reportsThisMonth}</strong>
          </div>
          <div className="stats-card c">
            <span>{displayNames.reportsThisWeek}</span>
            <strong>{stats.reportsThisWeek}</strong>
          </div>
          <div className="stats-card d">
            <span>{displayNames.reportsToday}</span>
            <strong>{stats.reportsToday}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReportStatistics;
