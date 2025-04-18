import React, { useState } from "react";
import { Report } from "../types/formTypes";
import useMediaQuery from "../hooks/useMediaQuery";
import { toast } from "react-toastify";
import { resendReportEmail } from "../services/reportService";
import { useNavigate } from "react-router-dom";

interface ReportsTableProps {
  reports: Report[];
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  sortBy: string;
  sortOrder: string;
  onSort: (column: string) => void;
  activeFilter: string;
  clearFilter: () => void;
}

const ReportsTable: React.FC<ReportsTableProps> = ({
  reports,
  page,
  totalPages,
  onPageChange,
  onSort,
  activeFilter,
  clearFilter,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    reportId: string;
  } | null>(null);
  const [activeReportId, setActiveReportId] = useState("");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const navigate = useNavigate();

  const handleRightClick = (event: React.MouseEvent, reportId: string) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY + window.scrollY,
      reportId,
    });
    setActiveReportId(reportId);
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
    setActiveReportId("");
  };

  const handleViewDetails = () => {
    const report = reports.find((r) => r.reportId === contextMenu?.reportId);
    if (report) {
      navigate(`/view-customer-report/${report.reportId}`);
    }
  };

  const handleDeleteReport = () => {
    // Implement delete report logic here
    // console.log("Delete report ID:", contextMenu?.reportId);
    toast.error("Deleting report has been disabled!");
    handleCloseContextMenu();
  };

  const handleResendEmail = () => {
    const reportId = contextMenu?.reportId || "";
    resendReportEmail(reportId);
    console.log("Resend email for report ID:", contextMenu?.reportId);
    handleCloseContextMenu();
  };

  const handleCloseOverlay = () => {
    setSelectedReport(null);
  };

  return (
    <div className="reports-table-container" onClick={handleCloseContextMenu}>
      {activeFilter && (
        <div className="active-filter">
          <span>Active Filter: {activeFilter}</span>
          <button onClick={clearFilter}>Clear Filter</button>
        </div>
      )}
      {reports && reports.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => onSort("reportId")}>Report ID</th>
              <th onClick={() => onSort("customer.name")}>Customer Name</th>
              {!isMobile && (
                <>
                  <th onClick={() => onSort("createdBy.userName")}>
                    Created By
                  </th>
                  <th onClick={() => onSort("bodyFatDetails.weight")}>
                    Weight
                  </th>
                  <th onClick={() => onSort("bodyFatDetails.bodyFat")}>
                    Body Fat %
                  </th>
                  <th onClick={() => onSort("bodyFatDetails.visceralFat")}>
                    Visceral Fat %
                  </th>
                  <th onClick={() => onSort("bodyFatDetails.bmi")}>BMI</th>
                  <th onClick={() => onSort("bodyFatDetails.bodyAge")}>
                    Body Age
                  </th>
                </>
              )}
              <th onClick={() => onSort("createdAt")}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr
                key={report._id}
                onContextMenu={(e) => handleRightClick(e, report.reportId)}
                className={
                  activeReportId === report.reportId ? "active-report-row" : ""
                }
              >
                <td>{report.reportId}</td>
                <td>{report.customer.name}</td>
                {!isMobile && (
                  <>
                    <td>{report.createdBy.userName}</td>
                    <td>{report.bodyFatDetails.weight}</td>
                    <td>{report.bodyFatDetails.bodyFat}</td>
                    <td>{report.bodyFatDetails.visceralFat}</td>
                    <td>{report.bodyFatDetails.bmi}</td>
                    <td>{report.bodyFatDetails.bodyAge}</td>
                  </>
                )}
                <td>
                  {report.createdAt
                    ? new Date(report.createdAt).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reports available</p>
      )}
      <div className="pagination">
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      {contextMenu && (
        <div
          className="context-menu"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button onClick={handleViewDetails}>View Report Details</button>
          <button onClick={handleDeleteReport}>Delete Report</button>
          <button onClick={handleResendEmail}>Resend Report Email</button>
        </div>
      )}
    </div>
  );
};

export default ReportsTable;
