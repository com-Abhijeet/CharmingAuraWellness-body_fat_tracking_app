import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert an image to Base64
const getBase64Image = (filePath) => {
  const image = fs.readFileSync(filePath);
  return `data:image/png;base64,${image.toString("base64")}`;
};

// Low and high values extracted from calculateCategory
const thresholds = {
  male: {
    weight: { low: 50, high: 80 },
    bodyFat: { low: 10, high: 20 },
    visceralFat: { low: 1, high: 10 },
    restingMetabolism: { low: 1500, high: 2000 },
    bmi: { low: 18.5, high: 24.9 },
    bodyAge: { low: 20, high: 30 },
    wholeBodySubcutaneous: { low: 10, high: 20 },
    trunkFat: { low: 10, high: 20 },
    armFat: { low: 10, high: 20 },
    legFat: { low: 10, high: 20 },
    skeletalMuscle: { low: 30, high: 40 },
    trunkMuscles: { low: 30, high: 40 },
    armMuscles: { low: 30, high: 40 },
    legMuscles: { low: 30, high: 40 },
  },
  female: {
    weight: { low: 45, high: 75 },
    bodyFat: { low: 15, high: 25 },
    visceralFat: { low: 1, high: 10 },
    restingMetabolism: { low: 1200, high: 1800 },
    bmi: { low: 18.5, high: 24.9 },
    bodyAge: { low: 20, high: 30 },
    wholeBodySubcutaneous: { low: 15, high: 25 },
    trunkFat: { low: 15, high: 25 },
    armFat: { low: 15, high: 25 },
    legFat: { low: 15, high: 25 },
    skeletalMuscle: { low: 25, high: 35 },
    trunkMuscles: { low: 25, high: 35 },
    armMuscles: { low: 25, high: 35 },
    legMuscles: { low: 25, high: 35 },
  },
};

const generatePDF = async (reportData, customerData, associateData) => {
  const templatePath = path.join(__dirname, "template.html");
  const pdfPath = path.join(
    __dirname,
    "../reports",
    `${reportData.reportId}.pdf`
  );

  // Read the HTML template
  const templateHtml = fs.readFileSync(templatePath, "utf-8");

  // Compile the template using Handlebars
  const template = Handlebars.compile(templateHtml);

  // Determine gender-specific thresholds
  const gender = customerData.gender.toLowerCase();
  const genderThresholds = thresholds[gender];

  // Calculate graph positions
  const calculateLeft = (value, low, high) => {
    return Math.max(0, Math.min(((value - low) / (high - low)) * 100, 100));
  };

  const bodyFatDetails = {
    weight: {
      value: reportData.bodyFatDetails.weight,
      left: calculateLeft(
        reportData.bodyFatDetails.weight,
        genderThresholds.weight.low,
        genderThresholds.weight.high
      ),
      low: genderThresholds.weight.low,
      high: genderThresholds.weight.high,
    },
    bodyFat: {
      value: reportData.bodyFatDetails.bodyFat,
      left: calculateLeft(
        reportData.bodyFatDetails.bodyFat,
        genderThresholds.bodyFat.low,
        genderThresholds.bodyFat.high
      ),
      low: genderThresholds.bodyFat.low,
      high: genderThresholds.bodyFat.high,
    },
    visceralFat: {
      value: reportData.bodyFatDetails.visceralFat,
      left: calculateLeft(
        reportData.bodyFatDetails.visceralFat,
        genderThresholds.visceralFat.low,
        genderThresholds.visceralFat.high
      ),
      low: genderThresholds.visceralFat.low,
      high: genderThresholds.visceralFat.high,
    },
    restingMetabolism: {
      value: reportData.bodyFatDetails.restingMetabolism,
      left: calculateLeft(
        reportData.bodyFatDetails.restingMetabolism,
        genderThresholds.restingMetabolism.low,
        genderThresholds.restingMetabolism.high
      ),
      low: genderThresholds.restingMetabolism.low,
      high: genderThresholds.restingMetabolism.high,
    },
    bmi: {
      value: reportData.bodyFatDetails.bmi,
      left: calculateLeft(
        reportData.bodyFatDetails.bmi,
        genderThresholds.bmi.low,
        genderThresholds.bmi.high
      ),
      low: genderThresholds.bmi.low,
      high: genderThresholds.bmi.high,
    },
    bodyAge: {
      value: reportData.bodyFatDetails.bodyAge,
      left: calculateLeft(
        reportData.bodyFatDetails.bodyAge,
        genderThresholds.bodyAge.low,
        genderThresholds.bodyAge.high
      ),
      low: genderThresholds.bodyAge.low,
      high: genderThresholds.bodyAge.high,
    },
    wholeBodySubcutaneous: {
      value: reportData.bodyFatDetails.wholeBodySubcutaneous,
      left: calculateLeft(
        reportData.bodyFatDetails.wholeBodySubcutaneous,
        genderThresholds.wholeBodySubcutaneous.low,
        genderThresholds.wholeBodySubcutaneous.high
      ),
      low: genderThresholds.wholeBodySubcutaneous.low,
      high: genderThresholds.wholeBodySubcutaneous.high,
    },
    trunkFat: {
      value: reportData.bodyFatDetails.trunkFat,
      left: calculateLeft(
        reportData.bodyFatDetails.trunkFat,
        genderThresholds.trunkFat.low,
        genderThresholds.trunkFat.high
      ),
      low: genderThresholds.trunkFat.low,
      high: genderThresholds.trunkFat.high,
    },
    armFat: {
      value: reportData.bodyFatDetails.armFat,
      left: calculateLeft(
        reportData.bodyFatDetails.armFat,
        genderThresholds.armFat.low,
        genderThresholds.armFat.high
      ),
      low: genderThresholds.armFat.low,
      high: genderThresholds.armFat.high,
    },
    legFat: {
      value: reportData.bodyFatDetails.legFat,
      left: calculateLeft(
        reportData.bodyFatDetails.legFat,
        genderThresholds.legFat.low,
        genderThresholds.legFat.high
      ),
      low: genderThresholds.legFat.low,
      high: genderThresholds.legFat.high,
    },
    skeletalMuscle: {
      value: reportData.bodyFatDetails.skeletalMuscle,
      left: calculateLeft(
        reportData.bodyFatDetails.skeletalMuscle,
        genderThresholds.skeletalMuscle.low,
        genderThresholds.skeletalMuscle.high
      ),
      low: genderThresholds.skeletalMuscle.low,
      high: genderThresholds.skeletalMuscle.high,
    },
    trunkMuscles: {
      value: reportData.bodyFatDetails.trunkMuscles,
      left: calculateLeft(
        reportData.bodyFatDetails.trunkMuscles,
        genderThresholds.trunkMuscles.low,
        genderThresholds.trunkMuscles.high
      ),
      low: genderThresholds.trunkMuscles.low,
      high: genderThresholds.trunkMuscles.high,
    },
    armMuscles: {
      value: reportData.bodyFatDetails.armMuscles,
      left: calculateLeft(
        reportData.bodyFatDetails.armMuscles,
        genderThresholds.armMuscles.low,
        genderThresholds.armMuscles.high
      ),
      low: genderThresholds.armMuscles.low,
      high: genderThresholds.armMuscles.high,
    },
    legMuscles: {
      value: reportData.bodyFatDetails.legMuscles,
      left: calculateLeft(
        reportData.bodyFatDetails.legMuscles,
        genderThresholds.legMuscles.low,
        genderThresholds.legMuscles.high
      ),
      low: genderThresholds.legMuscles.low,
      high: genderThresholds.legMuscles.high,
    },
  };

  // Deconstruct fatSideEffects
  const {
    heartDisease,
    highBloodPressure,
    highBloodColestrol,
    diabeties,
    headAche,
    cancer,
    difficultyBreathinginSleep,
    tierdEasily,
    snoringInSleep,
    stomachIssues,
    menstrualCycleIssue,
    paralysis,
    bodyAche,
    weakMemory,
    darkeningOfFace,
    hairfall,
  } = reportData.fatSideEffects;

  const fatSideEffects = {
    heartDisease,
    highBloodPressure,
    highBloodColestrol,
    diabeties,
    headAche,
    cancer,
    difficultyBreathinginSleep,
    tierdEasily,
    snoringInSleep,
    stomachIssues,
    menstrualCycleIssue,
    paralysis,
    bodyAche,
    weakMemory,
    darkeningOfFace,
    hairfall,
  };

  const leaderboardImage = getBase64Image(
    path.join(__dirname, "leaderboard-banner-top.png")
  );

  // Prepare the data for the template
  const data = {
    leaderboardImage,
    reportId: reportData.reportId,
    customerName: customerData.name,
    customerEmail: customerData.email,
    customerContact: customerData.phoneNumber,
    customerAddress: customerData.address,
    associateName: associateData.userName,
    associateEmail: associateData.email,
    associateContact: associateData.phoneNumber,
    associateAddress: associateData.address,
    bodyFatDetails,
    fatSideEffects,

  };

  // Generate the final HTML by injecting the data
  const finalHtml = template(data);

  // Use Puppeteer to generate the PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the HTML content
  await page.setContent(finalHtml, { waitUntil: "domcontentloaded" });

  // Generate the PDF
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: {
      top: "1cm",
    },
  });

  await browser.close();

  return pdfPath;
};

export default generatePDF;
