import React from "react";
import { Report } from "../types/formTypes";

interface ReportDetailsOverlayProps {
  report: Report;
  onClose: () => void;
}

const ReportDetailsOverlay: React.FC<ReportDetailsOverlayProps> = ({
  report,
  onClose,
}) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Report Details</h2>
        <div className="report-details">
          <p>
            <strong>Report ID:</strong> {report.reportId}
          </p>
          <p>
            <strong>Customer Name:</strong> {report.customer.name}
          </p>
          <p>
            <strong>Created By:</strong> {report.createdBy.userName}
          </p>
          <p>
            <strong>Weight:</strong> {report.bodyFatDetails.weight}
          </p>
          <p>
            <strong>Ideal Weight:</strong> {report.bodyFatDetails.idealWeight}
          </p>
          <p>
            <strong>Extra Weight:</strong> {report.bodyFatDetails.extraWeight}
          </p>
          <p>
            <strong>Less Weight:</strong> {report.bodyFatDetails.lessWeight}
          </p>
          <p>
            <strong>Body Fat %:</strong> {report.bodyFatDetails.bodyFat}
          </p>
          <p>
            <strong>Visceral Fat %:</strong> {report.bodyFatDetails.visceralFat}
          </p>
          <p>
            <strong>Resting Metabolism:</strong>{" "}
            {report.bodyFatDetails.restingMetabolism}
          </p>
          <p>
            <strong>BMI:</strong> {report.bodyFatDetails.bmi}
          </p>
          <p>
            <strong>Body Age:</strong> {report.bodyFatDetails.bodyAge}
          </p>
          <p>
            <strong>Whole Body Subcutaneous:</strong>{" "}
            {report.bodyFatDetails.wholeBodySubcutaneous}
          </p>
          <p>
            <strong>Trunk Fat:</strong> {report.bodyFatDetails.trunkFat}
          </p>
          <p>
            <strong>Arm Fat:</strong> {report.bodyFatDetails.armFat}
          </p>
          <p>
            <strong>Leg Fat:</strong> {report.bodyFatDetails.legFat}
          </p>
          <p>
            <strong>Skeletal Muscle:</strong>{" "}
            {report.bodyFatDetails.skeletalMuscle}
          </p>
          <p>
            <strong>Trunk Muscles:</strong> {report.bodyFatDetails.trunkMuscles}
          </p>
          <p>
            <strong>Arm Muscles:</strong> {report.bodyFatDetails.armMuscles}
          </p>
          <p>
            <strong>Leg Muscles:</strong> {report.bodyFatDetails.legMuscles}
          </p>
          <p>
            <strong>Heart Disease:</strong>{" "}
            {report.fatSideEffects.heartDisease ? "Yes" : "No"}
          </p>
          <p>
            <strong>High Blood Pressure:</strong>{" "}
            {report.fatSideEffects.highBloodPressure ? "Yes" : "No"}
          </p>
          <p>
            <strong>High Blood Cholesterol:</strong>{" "}
            {report.fatSideEffects.highBloodColestrol ? "Yes" : "No"}
          </p>
          <p>
            <strong>Diabetes:</strong>{" "}
            {report.fatSideEffects.diabeties ? "Yes" : "No"}
          </p>
          <p>
            <strong>Headache:</strong>{" "}
            {report.fatSideEffects.headAche ? "Yes" : "No"}
          </p>
          <p>
            <strong>Cancer:</strong>{" "}
            {report.fatSideEffects.cancer ? "Yes" : "No"}
          </p>
          <p>
            <strong>Difficulty Breathing in Sleep:</strong>{" "}
            {report.fatSideEffects.difficultyBreathinginSleep ? "Yes" : "No"}
          </p>
          <p>
            <strong>Tired Easily:</strong>{" "}
            {report.fatSideEffects.tierdEasily ? "Yes" : "No"}
          </p>
          <p>
            <strong>Snoring in Sleep:</strong>{" "}
            {report.fatSideEffects.snoringInSleep ? "Yes" : "No"}
          </p>
          <p>
            <strong>Stomach Issues:</strong>{" "}
            {report.fatSideEffects.stomachIssues ? "Yes" : "No"}
          </p>
          <p>
            <strong>Menstrual Cycle Issue:</strong>{" "}
            {report.fatSideEffects.menstrualCycleIssue ? "Yes" : "No"}
          </p>
          <p>
            <strong>Paralysis:</strong>{" "}
            {report.fatSideEffects.paralysis ? "Yes" : "No"}
          </p>
          <p>
            <strong>Body Ache:</strong>{" "}
            {report.fatSideEffects.bodyAche ? "Yes" : "No"}
          </p>
          <p>
            <strong>Weak Memory:</strong>{" "}
            {report.fatSideEffects.weakMemory ? "Yes" : "No"}
          </p>
          <p>
            <strong>Darkening of Face:</strong>{" "}
            {report.fatSideEffects.darkeningOfFace ? "Yes" : "No"}
          </p>
          <p>
            <strong>Hairfall:</strong>{" "}
            {report.fatSideEffects.hairfall ? "Yes" : "No"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {report.createdAt ? new Date(report.createdAt).toLocaleString() : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailsOverlay;
