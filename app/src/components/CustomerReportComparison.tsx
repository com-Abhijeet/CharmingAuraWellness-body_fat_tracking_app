import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Report } from "../types/formTypes";

const CustomerReportComparison: React.FC = () => {
  const reports = useSelector(
    (state: { reports: { reports: Report[] } }) => state.reports.reports
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [reportToCompare1Id, setReportToCompare1Id] = useState<string | null>(
    null
  );
  const [reportToCompare2Id, setReportToCompare2Id] = useState<string | null>(
    null
  );
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [showList, setShowList] = useState<boolean>(false);

  const filteredReports = reports.filter(
    (report) =>
      report.reportId.includes(searchTerm) ||
      new Date(report.createdAt!).toLocaleDateString().includes(searchTerm)
  );

  const handleSelectReport = (reportId: string) => {
    if (!reportToCompare1Id) {
      setReportToCompare1Id(reportId);
    } else if (!reportToCompare2Id) {
      setReportToCompare2Id(reportId);
    }
    setSearchTerm("");
    setHighlightedIndex(-1);
    setShowList(false);
  };

  const handleDeselectReport1 = () => {
    setReportToCompare1Id(null);
  };

  const handleDeselectReport2 = () => {
    setReportToCompare2Id(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredReports.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      handleSelectReport(filteredReports[highlightedIndex].reportId);
    }
  };

  const reportToCompare1 =
    reports.find((report) => report.reportId === reportToCompare1Id) || null;
  const reportToCompare2 =
    reports.find((report) => report.reportId === reportToCompare2Id) || null;

  return (
    <div className="customer-report-comparison">
      <h2>Compare Reports</h2>
      <hr />
      <div className="selected-reports">
        <div className="selected-report">
          <span>
            Report 1:{" "}
            {reportToCompare1
              ? `${reportToCompare1.reportId} - ${new Date(
                  reportToCompare1.createdAt!
                ).toLocaleDateString()}`
              : "None"}
          </span>
          {reportToCompare1 && (
            <i
              className="bi bi-x-circle-fill deselect-icon"
              onClick={handleDeselectReport1}
            ></i>
          )}
        </div>
        <div className="selected-report">
          <span>
            Report 2:{" "}
            {reportToCompare2
              ? `${reportToCompare2.reportId} - ${new Date(
                  reportToCompare2.createdAt!
                ).toLocaleDateString()}`
              : "None"}
          </span>
          {reportToCompare2 && (
            <i
              className="bi bi-x-circle-fill deselect-icon"
              onClick={handleDeselectReport2}
            ></i>
          )}
        </div>
      </div>
      <hr />
      {!reportToCompare1Id || !reportToCompare2Id ? (
        <div className="form-group">
          <label>Search and Select Reports</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Report ID or Date"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowList(true)}
            onBlur={() => setTimeout(() => setShowList(false), 200)} // Delay to allow click event to register
          />
          {showList && (
            <ul className="list-group mt-2 show">
              {(searchTerm ? filteredReports : reports).map((report, index) => (
                <li
                  key={report.reportId}
                  className={`list-group-item list-group-item-action ${
                    highlightedIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleSelectReport(report.reportId)}
                >
                  {report.reportId} -{" "}
                  {new Date(report.createdAt!).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
      {reportToCompare1 && reportToCompare2 && (
        <div>
          <h3>Comparison</h3>
          <hr />
          <table className="table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Report 1</th>
                <th>Report 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Weight</td>
                <td>{reportToCompare1.bodyFatDetails.weight}</td>
                <td>{reportToCompare2.bodyFatDetails.weight}</td>
              </tr>
              <tr>
                <td>Ideal Weight</td>
                <td>{reportToCompare1.bodyFatDetails.idealWeight}</td>
                <td>{reportToCompare2.bodyFatDetails.idealWeight}</td>
              </tr>
              <tr>
                <td>Extra Weight</td>
                <td>{reportToCompare1.bodyFatDetails.extraWeight}</td>
                <td>{reportToCompare2.bodyFatDetails.extraWeight}</td>
              </tr>
              <tr>
                <td>Less Weight</td>
                <td>{reportToCompare1.bodyFatDetails.lessWeight}</td>
                <td>{reportToCompare2.bodyFatDetails.lessWeight}</td>
              </tr>
              <tr>
                <td>Body Fat</td>
                <td>{reportToCompare1.bodyFatDetails.bodyFat}</td>
                <td>{reportToCompare2.bodyFatDetails.bodyFat}</td>
              </tr>
              <tr>
                <td>Visceral Fat</td>
                <td>{reportToCompare1.bodyFatDetails.visceralFat}</td>
                <td>{reportToCompare2.bodyFatDetails.visceralFat}</td>
              </tr>
              <tr>
                <td>Resting Metabolism</td>
                <td>{reportToCompare1.bodyFatDetails.restingMetabolism}</td>
                <td>{reportToCompare2.bodyFatDetails.restingMetabolism}</td>
              </tr>
              <tr>
                <td>BMI</td>
                <td>{reportToCompare1.bodyFatDetails.bmi}</td>
                <td>{reportToCompare2.bodyFatDetails.bmi}</td>
              </tr>
              <tr>
                <td>Body Age</td>
                <td>{reportToCompare1.bodyFatDetails.bodyAge}</td>
                <td>{reportToCompare2.bodyFatDetails.bodyAge}</td>
              </tr>
              <tr>
                <td>Whole Body Subcutaneous Fat</td>
                <td>{reportToCompare1.bodyFatDetails.wholeBodySubcutaneous}</td>
                <td>{reportToCompare2.bodyFatDetails.wholeBodySubcutaneous}</td>
              </tr>
              <tr>
                <td>Trunk Fat</td>
                <td>{reportToCompare1.bodyFatDetails.trunkFat}</td>
                <td>{reportToCompare2.bodyFatDetails.trunkFat}</td>
              </tr>
              <tr>
                <td>Arm Fat</td>
                <td>{reportToCompare1.bodyFatDetails.armFat}</td>
                <td>{reportToCompare2.bodyFatDetails.armFat}</td>
              </tr>
              <tr>
                <td>Leg Fat</td>
                <td>{reportToCompare1.bodyFatDetails.legFat}</td>
                <td>{reportToCompare2.bodyFatDetails.legFat}</td>
              </tr>
              <tr>
                <td>Skeletal Muscle</td>
                <td>{reportToCompare1.bodyFatDetails.skeletalMuscle}</td>
                <td>{reportToCompare2.bodyFatDetails.skeletalMuscle}</td>
              </tr>
              <tr>
                <td>Trunk Muscles</td>
                <td>{reportToCompare1.bodyFatDetails.trunkMuscles}</td>
                <td>{reportToCompare2.bodyFatDetails.trunkMuscles}</td>
              </tr>
              <tr>
                <td>Arm Muscles</td>
                <td>{reportToCompare1.bodyFatDetails.armMuscles}</td>
                <td>{reportToCompare2.bodyFatDetails.armMuscles}</td>
              </tr>
              <tr>
                <td>Leg Muscles</td>
                <td>{reportToCompare1.bodyFatDetails.legMuscles}</td>
                <td>{reportToCompare2.bodyFatDetails.legMuscles}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerReportComparison;
