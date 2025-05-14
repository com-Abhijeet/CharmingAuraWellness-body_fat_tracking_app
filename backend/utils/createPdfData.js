import {
  calculateWeightCategory,
  calculateWeightChange,
  calculateBmi,
  calculateFatMass,
  calculateSubcutaneous,
  muscleMass,
  boneMass,
  restingMetabolismRange,
  generateBodyTypeMatrix,
  calculateBodyAgeRange,
} from "../utils/pdfCalculations.js";

import fs from "fs";
import path from "path";

export const createPdfData = (customerData, reportData, pastWeight) => {
  // Calculate weight change
  console.log("report data in createPdfData.js", reportData);
  const reportId = reportData.reportId;
  const weightChange = calculateWeightChange(reportData.weight, pastWeight);

  // Calculate BMI
  const bmiResult = calculateBmi(reportData.bmi);

  // Calculate body fat
  const fatMassResult = calculateFatMass(reportData.weight, reportData.bodyFat);

  // Calculate subcutaneous fat
  const subcutaneousResult = calculateSubcutaneous(
    reportData.wholeBodySubcutaneous,
    customerData.gender
  );

  // Calculate muscle mass
  const muscleMassResult = muscleMass(
    reportData.skeletalMuscle,
    reportData.weight,
    customerData.gender
  );

  // Calculate bone mass
  const boneMassResult = boneMass(
    fatMassResult.value,
    muscleMassResult.value,
    reportData.weight
  );

  // Calculate resting metabolism range
  const restingMetabolismResult = restingMetabolismRange(
    reportData.restingMetabolism,
    customerData.gender
  );

  // Calculate weight category
  const weightCategoryResult = calculateWeightCategory(
    reportData.weight,
    reportData.idealWeight
  );

  //calculate body type matrix
  const bodyTypeMatrix = generateBodyTypeMatrix(
    fatMassResult.value,
    muscleMassResult.value
  );

  //calculate body age range
  const bodyAgeRangeResult = calculateBodyAgeRange(customerData.age);

  // Convert the human body image to base64
  const imagePath = path.resolve("./assets/humanbody.png");
  const humanBodyImageBase64 = fs.readFileSync(imagePath, {
    encoding: "base64",
  });
  const humanBodyImageUri = `data:image/png;base64,${humanBodyImageBase64}`;

  // Prepare flat data
  const flatData = {
    // General Information
    title: "Body Composition Report",
    reportTitle: "Body Composition Analysis Report",
    reportDate: new Date().toLocaleDateString(),
    reportId: reportId,
    footerText: "Scan to download AiLink APP",
    qrCodeUrl: `https://chart.googleapis.com/chart?chs=80x80&cht=qr&chl=https://example.com/report/${reportData.reportId}`,

    // Customer Information
    customerData: {
      name: customerData.name,
      gender: customerData.gender,
      height: customerData.height,
      age: new Date().getFullYear() - new Date(customerData.dob).getFullYear(),
    },

    // Weight Information
    weight: reportData.weight,
    idealWeight: reportData.idealWeight,
    weightCategory: weightCategoryResult,
    weightCategoryClass: weightCategoryResult, // Repurposed as class
    weightChange: weightChange.value,
    weightChangeDirection: weightChange.direction,
    weightChangeText: weightChange.text,
    weightChangeClass: weightChange.cssClass, // Repurposed as class

    // BMI Information
    bmiValue: reportData.bmi,
    bmiStatus: bmiResult,
    bmiClass: bmiResult, // Repurposed as class

    // Body Fat Information
    bodyFatValue: fatMassResult.value,
    bodyFatStatus: fatMassResult.status,
    bodyFatClass: fatMassResult.status, // Repurposed as class

    // Subcutaneous Fat Information
    subcutaneousFatValue: subcutaneousResult.value,
    subcutaneousFatStatus: subcutaneousResult.status,
    subcutaneousFatClass: subcutaneousResult.status, // Repurposed as class
    subcutaneousFatRange: subcutaneousResult.range,

    // Muscle Mass Information
    muscleMassValue: muscleMassResult.value,
    muscleMassStatus: muscleMassResult.status,
    muscleMassClass: muscleMassResult.status, // Repurposed as class

    // Bone Mass Information
    boneMassValue: boneMassResult.value,
    boneMassStatus: boneMassResult.status,
    boneMassClass: boneMassResult.status, // Repurposed as class

    // Resting Metabolism Information
    restingMetabolismValue: restingMetabolismResult.value,
    restingMetabolismRange: restingMetabolismResult.range,

    bodyType: bodyTypeMatrix,

    // Other Indicators
    visceralFatValue: reportData.visceralFat,
    visceralFatRange: "<12", // Example range
    bodyAgeValue: reportData.bodyAge,
    bodyAgeRange: bodyAgeRangeResult, // Example range
    obesityRating: bmiResult, // Derived from BMI
    obesityRatingRange: "Normal", // Example range
    proteinRateValue: "18%", // Example value
    proteinRateRange: "16-20%", // Example range

    humanBodyImageUri: humanBodyImageUri,
  };

  return flatData;
};
