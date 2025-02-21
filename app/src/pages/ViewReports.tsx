import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReports as fetchReportsService,
  fetchStats,
} from "../services/reportService";
import { setReports, setStats } from "../redux/reportsSlice";
import Sidebar from "../components/Sidebar";
import ReportsTable from "../components/ReportsTable";
import ReportsStatistics from "../components/ReportsStatistics";
import { Report } from "../types/formTypes";
import Footer from "../components/Footer";

const ViewReports = () => {
  const dispatch = useDispatch();
  const reports = useSelector(
    (state: { reports: { reports: Report[] | null } }) => state.reports.reports
  );

  const user = useSelector((state: { user: { user: any } }) => state.user.user);
  console.log(user);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await fetchReportsService(
          page,
          30,
          sortBy,
          sortOrder,
          user.email
        );
        dispatch(setReports(data.reports));
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [dispatch, page, sortBy, sortOrder]);

  useEffect(() => {
    const fetchReportStats = async () => {
      try {
        const data = await fetchStats(user.email);
        dispatch(setStats(data));
        console.log(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchReportStats();
  }, [dispatch]);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
    setPage(1); // Reset to first page on new sort
    setActiveFilter(column);
  };

  const clearFilter = () => {
    setSortBy("createdAt");
    setSortOrder("desc");
    setActiveFilter("");
    setPage(1); // Reset to first page on clear filter
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="view-reports content-container">
        <div className="container">
          <h2>
            <i className="bi bi-clipboard-check-fill"></i>
            <span>Reports Dashboard</span>
          </h2>
          <hr />
          <ReportsStatistics /> {/* Add the statistics component */}
          <hr />
          <h2>Reports</h2>
          <ReportsTable
            reports={reports || []}
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            activeFilter={activeFilter}
            clearFilter={clearFilter}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewReports;
