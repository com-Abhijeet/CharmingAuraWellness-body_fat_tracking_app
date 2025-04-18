import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ReactSpeedometer, {
  CustomSegmentLabelPosition,
} from "react-d3-speedometer";
import { Report } from "../types/formTypes";
import thresholds from "../constants/thresholds";
import fatSideEffectsDisplayNames from "../constants/fatSideEffectsDisplayLabels";

const ReportsDetailsOverlay: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>(); // Get reportId from URL
  const navigate = useNavigate();

  // Get the current report from the Redux store
  const report = useSelector((state: { reports: { reports: Report[] } }) =>
    state.reports.reports.find((r) => r.reportId === reportId)
  );
  console.log(report);

  if (!report) {
    return <p>Report not found</p>;
  }

  const genderThresholds =
    thresholds[report.customer.gender.toLowerCase() as keyof typeof thresholds]; // Get thresholds based on gender

  const getSpeedometerConfig = (
    value: number,
    metric: keyof typeof genderThresholds | "weight"
  ) => {
    let low, normal, high, atRisk;

    if (metric === "weight") {
      console.log("if entered");
      const idealWeight = report.bodyFatDetails.idealWeight as number;

      // Define ranges based on idealWeight
      low = idealWeight - 6; // Below idealWeight - 6 is "Low"
      normal = idealWeight - 3; // Between idealWeight - 3 and idealWeight + 3 is "Normal"
      high = idealWeight + 3; // Between idealWeight + 3 and idealWeight + 6 is "High"
      atRisk = idealWeight + 6; // Above idealWeight + 6 is "At Risk"
    } else {
      // Use predefined thresholds for other metrics
      ({ low, normal, high, atRisk } = genderThresholds[metric]);
    }
    const maxValue = atRisk; // Set maxValue to the "At Risk" threshold for consistent scaling

    // Ensure the value does not exceed the maxValue
    const adjustedValue = Math.min(value, maxValue);

    // Calculate equal segment sizes
    const segmentSize = maxValue / 4;

    return {
      minValue: 0,
      maxValue, // Set maxValue to the "At Risk" threshold
      value: adjustedValue, // Use the adjusted value
      segments: 4,
      segmentColors: ["#FF4500", "#FFD700", "#90EE90", "#FF4500"], // Colors for Low, Normal, High, At Risk
      // customSegmentStops: [0, low, normal, high, atRisk],
      customSegmentStops: [
        0,
        segmentSize,
        segmentSize * 2,
        segmentSize * 3,
        maxValue,
      ],
      customSegmentLabels: [
        {
          text: `Low (${low} - ${normal} )`,
          position: CustomSegmentLabelPosition.Outside,
          color: "#555",
        },
        {
          text: `Normal (${normal} - ${high})`,
          position: CustomSegmentLabelPosition.Outside,
          color: "#555",
        },
        {
          text: `High (${high} - ${atRisk})`,
          position: CustomSegmentLabelPosition.Outside,
          color: "#555",
        },
        {
          text: `At Risk (${atRisk} + )`,
          position: CustomSegmentLabelPosition.Outside,
          color: "#555",
        },
      ],
      valueFormat: "d",
      currentValueText: `Value: ${value}`,
      needleHeightRatio: 0.8,
      width: 300, // Adjust width for better label positioning
      height: 250, // Adjust height for better label positioning
      labelFontSize: "12px", // Adjust font size for labels
    };
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="report-details content-container">
        <div className="container">
          <div className="header">
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
              &larr; Back
            </button>
            <h2>
              <i className="bi bi-bi-clipboard-check-fill"></i>Report Details
            </h2>
          </div>
          <hr />
          <div className="report-header">
            {/* Report ID */}
            <div className="report-id">
              <h3>Report ID: {reportId}</h3>
            </div>

            <div className="report-details-row">
              {/* Customer Details */}
              <div className="customer-details">
                <h4>Customer Details</h4>
                <p>
                  <strong>Name: </strong> {report.customer.name}
                </p>
                <p>
                  <strong>Age: </strong> {report.customer.age}
                </p>
                <p>
                  <strong>Gender: </strong> {report.customer.gender}
                </p>
                <p>
                  <strong>Contact: </strong> {report.customer.contact}
                </p>
                <p>
                  <strong>Address: </strong> {report.customer.address}
                </p>
              </div>

              {/* Created By Details */}
              <div className="created-by-details">
                <h4>Agent Details</h4>
                <p>
                  <strong>Name: </strong> {report.createdBy.userName}
                </p>
                <p>
                  <strong>Email: </strong> {report.createdBy.email}
                </p>
                <p>
                  <strong>Phone: </strong> {report.createdBy.phoneNumber}
                </p>
                <p>
                  <strong>Address: </strong> {report.createdBy.address}
                </p>
              </div>
            </div>
          </div>

          {/* Speedometers */}
          <div className="speedometers">
            <div className="body-report-stat">
              <h4>Weight</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.weight,
                    "weight"
                  )}
                />
              </div>
            </div>
            {/* BMI */}
            <div className="body-report-stat">
              <h4>BMI</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(report.bodyFatDetails.bmi, "bmi")}
                />
              </div>
            </div>
            {/* Body Fat */}
            <div className="body-report-stat">
              <h4>Body Fat %</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.bodyFat,
                    "bodyFat"
                  )}
                />
              </div>
            </div>
            {/* Visceral Fat */}
            <div className="body-report-stat">
              <h4>Visceral Fat</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.visceralFat,
                    "visceralFat"
                  )}
                />
              </div>
            </div>
            {/* Resting Metabolism */}
            <div className="body-report-stat">
              <h4>Resting Metabolism</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.restingMetabolism,
                    "restingMetabolism"
                  )}
                />
              </div>
            </div>
            {/* Body Age */}
            <div className="body-report-stat">
              <h4>Body Age</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.bodyAge,
                    "bodyAge"
                  )}
                />
              </div>
            </div>
            {/* Whole Body Subcutaneous Fat */}
            <div className="body-report-stat">
              <h4>Whole Body Subcutaneous Fat</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.wholeBodySubcutaneous,
                    "wholeBodySubcutaneous"
                  )}
                />
              </div>
            </div>
            {/* Trunk Fat */}
            <div className="body-report-stat">
              <h4>Trunk Fat</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.trunkFat,
                    "trunkFat"
                  )}
                />
              </div>
            </div>
            {/* Arm Fat */}
            <div className="body-report-stat">
              <h4>Arm Fat</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.armFat,
                    "armFat"
                  )}
                />
              </div>
            </div>
            {/* Leg Fat */}
            <div className="body-report-stat">
              <h4>Leg Fat</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.legFat,
                    "legFat"
                  )}
                />
              </div>
            </div>
            {/* Skeletal Muscle */}
            <div className="body-report-stat">
              <h4>Skeletal Muscle</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.skeletalMuscle,
                    "skeletalMuscle"
                  )}
                />
              </div>
            </div>
            {/* Trunk Muscles */}
            <div className="body-report-stat">
              <h4>Trunk Muscles</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.trunkMuscles,
                    "trunkMuscles"
                  )}
                />
              </div>
            </div>
            {/* Arm Muscles */}
            <div className="body-report-stat">
              <h4>Arm Muscles</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.armMuscles,
                    "armMuscles"
                  )}
                />
              </div>
            </div>
            {/* Leg Muscles */}
            <div className="body-report-stat">
              <h4>Leg Muscles</h4>
              <div className="speedometer">
                <ReactSpeedometer
                  {...getSpeedometerConfig(
                    report.bodyFatDetails.legMuscles,
                    "legMuscles"
                  )}
                />
              </div>
            </div>{" "}
          </div>
          <hr />

          <div className="fat-side-effects">
            <h4>Fat Side Effects</h4>
            <ul>
              {Object.entries(report.fatSideEffects)
                .filter(([_, value]) => value === true) // Only show true values
                .map(([key]) => (
                  <li key={key}>
                    {fatSideEffectsDisplayNames[key] || key}{" "}
                    {/* Use display name or fallback to key */}
                  </li>
                ))}
            </ul>
          </div>
          <hr />

          <p>
            <strong>Created At:</strong>{" "}
            {report.createdAt
              ? new Date(report.createdAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReportsDetailsOverlay;
