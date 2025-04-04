// import puppeteer from "puppeteer";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import Handlebars from "handlebars";
// import calculateCategory from "./calculateCategory.js"; // Import the calculateCategory function

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const generatePDF = async (reportData, customerData, associateData) => {
//   const templateHtml = fs.readFileSync(
//     path.join(__dirname, "index.html"),
//     "utf8"
//   );
//   const template = Handlebars.compile(templateHtml);

//   const gender = customerData.gender
//     ? customerData.gender.toLowerCase()
//     : "male";

//   const htmlContent = template({
//     reportId: reportData.reportId,
//     date: new Date().toLocaleDateString(),
//     customerName: customerData.name,
//     customerEmail: customerData.email,
//     customerContact: `+91 ${customerData.contact}`,
//     customerHeight: customerData.height,
//     customerWeight: customerData.weight,
//     customerGender: customerData.gender,
//     customerAddress: customerData.address,
//     associateName: associateData.name,
//     associateEmail: associateData.email,
//     associateContact: `+91 ${associateData.contact}`,
//     associateAddress: associateData.address,
//     weight: reportData.bodyFatDetails.weight,
//     weightType: calculateCategory(
//       "weight",
//       gender,
//       reportData.bodyFatDetails.weight
//     ),
//     idealWeight: reportData.bodyFatDetails.idealWeight,
//     idealWeightType: calculateCategory(
//       "weight",
//       gender,
//       reportData.bodyFatDetails.idealWeight
//     ),
//     extraWeight: reportData.bodyFatDetails.extraWeight,
//     extraWeightType: calculateCategory(
//       "weight",
//       gender,
//       reportData.bodyFatDetails.extraWeight
//     ),
//     lessWeight: reportData.bodyFatDetails.lessWeight,
//     lessWeightType: calculateCategory(
//       "weight",
//       gender,
//       reportData.bodyFatDetails.lessWeight
//     ),
//     bodyFat: reportData.bodyFatDetails.bodyFat,
//     bodyFatType: calculateCategory(
//       "bodyFat",
//       gender,
//       reportData.bodyFatDetails.bodyFat
//     ),
//     visceralFat: reportData.bodyFatDetails.visceralFat,
//     visceralFatType: calculateCategory(
//       "visceralFat",
//       gender,
//       reportData.bodyFatDetails.visceralFat
//     ),
//     restingMetabolism: reportData.bodyFatDetails.restingMetabolism,
//     restingMetabolismType: calculateCategory(
//       "restingMetabolism",
//       gender,
//       reportData.bodyFatDetails.restingMetabolism
//     ),
//     bmi: reportData.bodyFatDetails.bmi,
//     bmiType: calculateCategory("bmi", gender, reportData.bodyFatDetails.bmi),
//     bodyAge: reportData.bodyFatDetails.bodyAge,
//     bodyAgeType: calculateCategory(
//       "bodyAge",
//       gender,
//       reportData.bodyFatDetails.bodyAge
//     ),
//     wholeBodySubcutaneous: reportData.bodyFatDetails.wholeBodySubcutaneous,
//     wholeBodySubcutaneousType: calculateCategory(
//       "wholeBodySubcutaneous",
//       gender,
//       reportData.bodyFatDetails.wholeBodySubcutaneous
//     ),
//     trunkFat: reportData.bodyFatDetails.trunkFat,
//     trunkFatType: calculateCategory(
//       "trunkFat",
//       gender,
//       reportData.bodyFatDetails.trunkFat
//     ),
//     armFat: reportData.bodyFatDetails.armFat,
//     armFatType: calculateCategory(
//       "armFat",
//       gender,
//       reportData.bodyFatDetails.armFat
//     ),
//     legFat: reportData.bodyFatDetails.legFat,
//     legFatType: calculateCategory(
//       "legFat",
//       gender,
//       reportData.bodyFatDetails.legFat
//     ),
//     skeletalMuscle: reportData.bodyFatDetails.skeletalMuscle,
//     skeletalMuscleType: calculateCategory(
//       "skeletalMuscle",
//       gender,
//       reportData.bodyFatDetails.skeletalMuscle
//     ),
//     trunkMuscles: reportData.bodyFatDetails.trunkMuscles,
//     trunkMusclesType: calculateCategory(
//       "trunkMuscles",
//       gender,
//       reportData.bodyFatDetails.trunkMuscles
//     ),
//     armMuscles: reportData.bodyFatDetails.armMuscles,
//     armMusclesType: calculateCategory(
//       "armMuscles",
//       gender,
//       reportData.bodyFatDetails.armMuscles
//     ),
//     legMuscles: reportData.bodyFatDetails.legMuscles,
//     legMusclesType: calculateCategory(
//       "legMuscles",
//       gender,
//       reportData.bodyFatDetails.legMuscles
//     ),
//     hasSideEffects: Object.values(reportData.fatSideEffects).some(
//       (value) => value
//     ),
//     heartDisease: reportData.fatSideEffects.heartDisease,
//     highBloodPressure: reportData.fatSideEffects.highBloodPressure,
//     highBloodColestrol: reportData.fatSideEffects.highBloodColestrol,
//     diabeties: reportData.fatSideEffects.diabeties,
//     headAche: reportData.fatSideEffects.headAche,
//     cancer: reportData.fatSideEffects.cancer,
//     difficultyBreathinginSleep:
//       reportData.fatSideEffects.difficultyBreathinginSleep,
//     tierdEasily: reportData.fatSideEffects.tierdEasily,
//     snoringInSleep: reportData.fatSideEffects.snoringInSleep,
//     stomachIssues: reportData.fatSideEffects.stomachIssues,
//     menstrualCycleIssue: reportData.fatSideEffects.menstrualCycleIssue,
//     paralysis: reportData.fatSideEffects.paralysis,
//     bodyAche: reportData.fatSideEffects.bodyAche,
//     weakMemory: reportData.fatSideEffects.weakMemory,
//     darkeningOfFace: reportData.fatSideEffects.darkeningOfFace,
//     hairfall: reportData.fatSideEffects.hairfall,
//   });

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.setContent(htmlContent);

//   // Ensure the reports directory exists
//   const reportsDir = path.join(__dirname, "../reports");
//   if (!fs.existsSync(reportsDir)) {
//     fs.mkdirSync(reportsDir, { recursive: true });
//   }

//   const pdfPath = path.join(reportsDir, `${reportData.reportId}.pdf`);
//   await page.pdf({ path: pdfPath, format: "A4" });

//   await browser.close();
//   return pdfPath;
// };

// export default generatePDF;

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";
import pdf from "html-pdf"; // Import the html-pdf library
import calculateCategory from "./calculateCategory.js"; // Import the calculateCategory function

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatePDF = async (reportData, customerData, associateData) => {
  console.log(associateData);
  const templateHtml = fs.readFileSync(
    path.join(__dirname, "index.html"),
    "utf8"
  );
  const template = Handlebars.compile(templateHtml);

  const gender = customerData.gender
    ? customerData.gender.toLowerCase()
    : "male";

  const htmlContent = template({
    reportId: reportData.reportId,
    date: new Date().toLocaleDateString(),
    customerName: customerData.name,
    customerEmail: customerData.email,
    customerContact: `+91 ${customerData.contact}`,
    customerHeight: customerData.height,
    customerWeight: customerData.weight,
    customerGender: customerData.gender,
    customerAddress: customerData.address,
    associateName: associateData.userName,
    associateEmail: associateData.email,
    associateContact: `${associateData.phoneNumber}`,
    associateAddress: associateData.address,
    weight: reportData.bodyFatDetails.weight,
    weightType: calculateCategory(
      "weight",
      gender,
      reportData.bodyFatDetails.weight
    ),
    idealWeight: reportData.bodyFatDetails.idealWeight,
    idealWeightType: calculateCategory(
      "weight",
      gender,
      reportData.bodyFatDetails.idealWeight
    ),
    extraWeight: reportData.bodyFatDetails.extraWeight,
    extraWeightType: calculateCategory(
      "weight",
      gender,
      reportData.bodyFatDetails.extraWeight
    ),
    lessWeight: reportData.bodyFatDetails.lessWeight,
    lessWeightType: calculateCategory(
      "weight",
      gender,
      reportData.bodyFatDetails.lessWeight
    ),
    bodyFat: reportData.bodyFatDetails.bodyFat,
    bodyFatType: calculateCategory(
      "bodyFat",
      gender,
      reportData.bodyFatDetails.bodyFat
    ),
    visceralFat: reportData.bodyFatDetails.visceralFat,
    visceralFatType: calculateCategory(
      "visceralFat",
      gender,
      reportData.bodyFatDetails.visceralFat
    ),
    restingMetabolism: reportData.bodyFatDetails.restingMetabolism,
    restingMetabolismType: calculateCategory(
      "restingMetabolism",
      gender,
      reportData.bodyFatDetails.restingMetabolism
    ),
    bmi: reportData.bodyFatDetails.bmi,
    bmiType: calculateCategory("bmi", gender, reportData.bodyFatDetails.bmi),
    bodyAge: reportData.bodyFatDetails.bodyAge,
    bodyAgeType: calculateCategory(
      "bodyAge",
      gender,
      reportData.bodyFatDetails.bodyAge
    ),
    wholeBodySubcutaneous: reportData.bodyFatDetails.wholeBodySubcutaneous,
    wholeBodySubcutaneousType: calculateCategory(
      "wholeBodySubcutaneous",
      gender,
      reportData.bodyFatDetails.wholeBodySubcutaneous
    ),
    trunkFat: reportData.bodyFatDetails.trunkFat,
    trunkFatType: calculateCategory(
      "trunkFat",
      gender,
      reportData.bodyFatDetails.trunkFat
    ),
    armFat: reportData.bodyFatDetails.armFat,
    armFatType: calculateCategory(
      "armFat",
      gender,
      reportData.bodyFatDetails.armFat
    ),
    legFat: reportData.bodyFatDetails.legFat,
    legFatType: calculateCategory(
      "legFat",
      gender,
      reportData.bodyFatDetails.legFat
    ),
    skeletalMuscle: reportData.bodyFatDetails.skeletalMuscle,
    skeletalMuscleType: calculateCategory(
      "skeletalMuscle",
      gender,
      reportData.bodyFatDetails.skeletalMuscle
    ),
    trunkMuscles: reportData.bodyFatDetails.trunkMuscles,
    trunkMusclesType: calculateCategory(
      "trunkMuscles",
      gender,
      reportData.bodyFatDetails.trunkMuscles
    ),
    armMuscles: reportData.bodyFatDetails.armMuscles,
    armMusclesType: calculateCategory(
      "armMuscles",
      gender,
      reportData.bodyFatDetails.armMuscles
    ),
    legMuscles: reportData.bodyFatDetails.legMuscles,
    legMusclesType: calculateCategory(
      "legMuscles",
      gender,
      reportData.bodyFatDetails.legMuscles
    ),
    hasSideEffects: Object.values(reportData.fatSideEffects).some(
      (value) => value
    ),
    heartDisease: reportData.fatSideEffects.heartDisease,
    highBloodPressure: reportData.fatSideEffects.highBloodPressure,
    highBloodColestrol: reportData.fatSideEffects.highBloodColestrol,
    diabeties: reportData.fatSideEffects.diabeties,
    headAche: reportData.fatSideEffects.headAche,
    cancer: reportData.fatSideEffects.cancer,
    difficultyBreathinginSleep:
      reportData.fatSideEffects.difficultyBreathinginSleep,
    tierdEasily: reportData.fatSideEffects.tierdEasily,
    snoringInSleep: reportData.fatSideEffects.snoringInSleep,
    stomachIssues: reportData.fatSideEffects.stomachIssues,
    menstrualCycleIssue: reportData.fatSideEffects.menstrualCycleIssue,
    paralysis: reportData.fatSideEffects.paralysis,
    bodyAche: reportData.fatSideEffects.bodyAche,
    weakMemory: reportData.fatSideEffects.weakMemory,
    darkeningOfFace: reportData.fatSideEffects.darkeningOfFace,
    hairfall: reportData.fatSideEffects.hairfall,
  });

  // Ensure the reports directory exists
  const reportsDir = path.join(__dirname, "../reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const pdfPath = path.join(reportsDir, `${reportData.reportId}.pdf`);

  // Generate PDF using html-pdf
  return new Promise((resolve, reject) => {
    pdf.create(htmlContent, { format: "A4" }).toFile(pdfPath, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(pdfPath);
      }
    });
  });
};

export default generatePDF;
