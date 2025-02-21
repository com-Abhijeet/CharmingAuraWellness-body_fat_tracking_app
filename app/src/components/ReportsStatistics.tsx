import React from "react";
import { useSelector } from "react-redux";
import { Stats } from "../types/formTypes";

const displayNames = {
  totalReports: "Total Reports",
  reportsThisMonth: "Reports This Month",
  reportsThisWeek: "Reports This Week",
  reportsToday: "Reports Today",
  weight: "Weight",
  idealWeight: "Ideal Weight",
  extraWeight: "Extra Weight",
  lessWeight: "Less Weight",
  bodyFat: "Body Fat",
  visceralFat: "Visceral Fat",
  restingMetabolism: "Resting Metabolism",
  bmi: "BMI",
  bodyAge: "Body Age",
  wholeBodySubcutaneous: "Whole Body Subcutaneous",
  trunkFat: "Trunk Fat",
  armFat: "Arm Fat",
  legFat: "Leg Fat",
  skeletalMuscle: "Skeletal Muscle",
  trunkMuscles: "Trunk Muscles",
  armMuscles: "Arm Muscles",
  legMuscles: "Leg Muscles",
  heartDisease: "Heart Disease",
  highBloodPressure: "High Blood Pressure",
  highBloodColestrol: "High Blood Cholesterol",
  diabeties: "Diabetes",
  headAche: "Headache",
  cancer: "Cancer",
  difficultyBreathinginSleep: "Difficulty Breathing in Sleep",
  tierdEasily: "Tired Easily",
  snoringInSleep: "Snoring in Sleep",
  stomachIssues: "Stomach Issues",
  menstrualCycleIssue: "Menstrual Cycle Issue",
  paralysis: "Paralysis",
  bodyAche: "Body Ache",
  weakMemory: "Weak Memory",
  darkeningOfFace: "Darkening of Face",
  hairfall: "Hairfall",
};

const ReportsStatistics: React.FC = () => {
  const stats = useSelector(
    (state: { reports: { stats: Stats | null } }) => state.reports.stats
  );

  if (!stats) {
    return <p>Loading statistics...</p>;
  }

  return (
    <div className="reports-statistics">
      <div className="left-container">
        <div className="report-stats">
          <h3>Report Statistics</h3>
          <hr />
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
        <div className="side-effects-stats">
          <h3>Side Effects Statistics</h3>
          <hr />
          <div className="stats-cards">
            {stats.sideEffectsStats.map(([key, count]) => {
              const displayName =
                displayNames[key as keyof typeof displayNames];
              if (!displayName) return null;
              return (
                <div className="stats-card" key={key}>
                  <span>{displayName}</span>
                  <strong>{count}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="right-container">
        <div className="body-fat-stats">
          <h3>Body Fat Details Statistics</h3>
          <hr />
          <div className="stats-bars">
            {Object.keys(stats.bodyFatStats).map((key) => {
              const low = stats.bodyFatStats[key]?.low ?? 0;
              const avg = stats.bodyFatStats[key]?.avg ?? 0;
              const high = stats.bodyFatStats[key]?.high ?? 0;
              const totalRange = high - low;
              const lowWidth = totalRange
                ? ((avg - low) / totalRange) * 100
                : 0;
              const highWidth = totalRange
                ? ((high - avg) / totalRange) * 100
                : 0;

              return (
                <div className="stats-bar" key={key}>
                  <span>{displayNames[key as keyof typeof displayNames]}</span>
                  <div className="bar-container">
                    <div
                      className="bar low"
                      style={{
                        width: `${lowWidth}%`,
                      }}
                    ></div>
                    <div
                      className="bar avg"
                      style={{
                        width: `10%`,
                      }}
                    ></div>
                    <div
                      className="bar high"
                      style={{
                        width: `${highWidth}%`,
                      }}
                    ></div>
                  </div>
                  <div className="bar-labels">
                    <span>Low: {low}</span>
                    <span>Avg: {avg.toFixed(2)}</span>
                    <span>High: {high}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsStatistics;
