import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { fetchStats } from "../services/reportService";
import { fetchCustomerStats } from "../services/customerService";
import { useEffect } from "react";
import { setStats } from "../redux/reportsSlice";
import { setCustomerStats } from "../redux/customersSlice";
import DashboardReportStatistics from "../components/DashboardReportStatistics";
import DashboardCustomerStatistics from "../components/DashboardCustomerStatistics";
// import CustomerStatistics from "../components/CustomerStatistics";

const AssociateDashboard = () => {
  const dispatch = useDispatch();
  const reports = useSelector(
    (state: { reports: { reports: Report[] | null } }) => state.reports.reports
  );

  const user = useSelector((state: { user: { user: any } }) => state.user.user);
  console.log(user);

  useEffect(() => {
    const fetchReportStats = async () => {
      try {
        const data = await fetchStats(user.email);
        dispatch(setStats(data));
        console.log(data);
      } catch (error) {
        console.error("Error fetching report statistics:", error);
      }
    };

    const fetchCustomerStatistics = async () => {
      try {
        const data = await fetchCustomerStats(user.email);
        dispatch(setCustomerStats(data));
        console.log(data);
      } catch (error) {
        console.error("Error fetching customer statistics:", error);
      }
    };

    fetchReportStats();
    fetchCustomerStatistics();
  }, [dispatch, user.email]);

  return (
    <>
      <div className="page-container">
        <Sidebar />
        <div className="content-container">
          <div className="dashboard container">
            <h2>
              <i className="bi bi-columns-gap"></i>
              <span>Dashboard</span>
            </h2>
            <hr />
            <DashboardReportStatistics />
            <DashboardCustomerStatistics />
          </div>
        </div>
      </div>
    </>
  );
};

export default AssociateDashboard;
