import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda"
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatePDF = async (reportData, customerData) => {
  const browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  const page = await browser.newPage();

  const validateValue = (value, normalRange, highRange) => {
    if (value <= normalRange) {
      return `<span style="color: green;">${value} <i class="bi bi-check-circle"></i> Normal</span>`;
    } else if (value <= highRange) {
      return `<span style="color: yellow;">${value} <i class="bi bi-exclamation-triangle"></i> High</span>`;
    } else {
      return `<span style="color: red;">${value} <i class="bi bi-x-circle"></i> At Risk</span>`;
    }
  };

  const htmlContent = `
    <html>
      <head>
          <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f6f6f6;
    }
    .container {
      width: 95%;
      margin: 10px auto;
      padding: 20px;
      background-color: white;
      color: wheat;
      border: 1px solid white;
      border-radius: 15px;
    }
    h1 {
      font-size: 22px;
      font-weight: bold;
      text-align: center;
    }
    .row {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 5px;
    }
    .col {
      flex: 1;
    }
    .details {
        width: 30%;
        padding: 20px;
        border: 1px solid  #242038;
    }
    .details2{
        padding: 20px;
        border: 1px solid   #242038;
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: wheat;
    }
    .customer-details {
      margin-bottom: 20px;
    }
    .customer-details p {
      margin: 5px 0;
    }
    .fat-side-effects p {
      margin: 5px 0;
    }
    .fat-side-effects .checked {
      color: green;
    }
    .fat-side-effects .unchecked {
      color: red;
    }
  </style>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.8.1/font/bootstrap-icons.min.css">
      </head>
      <body>
        <div class="container">
          <div class="customer-details">
            <p><strong>Name:</strong> ${customerData.name}</p>
            <div class="row">
              <div class="col">
                <p><strong>Email:</strong> ${customerData.email}</p>
              </div>
              <div class="col">
                <p><strong>Contact:</strong> ${customerData.contact}</p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p><strong>Age:</strong> ${customerData.age}</p>
              </div>
              <div class="col">
                <p><strong>DOB:</strong> ${customerData.dob}</p>
              </div>
              <div class="col">
                <p><strong>Height:</strong> ${customerData.height}</p>
              </div>
              <div class="col">
                <p><strong>Weight:</strong> ${customerData.weight}</p>
              </div>
            </div>
            <p><strong>Address:</strong> ${customerData.address}</p>
          </div>

          <div class="row">
            <div class="details col">          
            <h1>Body Fat Details</h1>
            <hr/>
              <p><strong>Weight:</strong> ${validateValue(
                reportData.bodyFatDetails.weight,
                70,
                90
              )}</p>
              <p><strong>Ideal Weight:</strong> ${validateValue(
                reportData.bodyFatDetails.idealWeight,
                70,
                90
              )}</p>
              <p><strong>Extra Weight:</strong> ${validateValue(
                reportData.bodyFatDetails.extraWeight,
                5,
                10
              )}</p>
              <p><strong>Less Weight:</strong> ${validateValue(
                reportData.bodyFatDetails.lessWeight,
                5,
                10
              )}</p>
              <p><strong>Body Fat:</strong> ${validateValue(
                reportData.bodyFatDetails.bodyFat,
                20,
                25
              )}</p>
              <p><strong>Visceral Fat:</strong> ${validateValue(
                reportData.bodyFatDetails.visceralFat,
                14,
                16
              )}</p>
              <p><strong>Resting Metabolism:</strong> ${validateValue(
                reportData.bodyFatDetails.restingMetabolism,
                1800,
                2000
              )}</p>
              <p><strong>BMI:</strong> ${validateValue(
                reportData.bodyFatDetails.bmi,
                28,
                30
              )}</p>
              <p><strong>Body Age:</strong> ${validateValue(
                reportData.bodyFatDetails.bodyAge,
                30,
                40
              )}</p>
              <p><strong>Whole Body Subcutaneous:</strong> ${validateValue(
                reportData.bodyFatDetails.wholeBodySubcutaneous,
                20,
                30
              )}</p>
              <p><strong>Trunk Fat:</strong> ${validateValue(
                reportData.bodyFatDetails.trunkFat,
                15,
                20
              )}</p>
              <p><strong>Arm Fat:</strong> ${validateValue(
                reportData.bodyFatDetails.armFat,
                20,
                30
              )}</p>
              <p><strong>Leg Fat:</strong> ${validateValue(
                reportData.bodyFatDetails.legFat,
                20,
                30
              )}</p>
              <p><strong>Skeletal Muscle:</strong> ${validateValue(
                reportData.bodyFatDetails.skeletalMuscle,
                33,
                40
              )}</p>
              <p><strong>Trunk Muscles:</strong> ${validateValue(
                reportData.bodyFatDetails.trunkMuscles,
                25,
                30
              )}</p>
              <p><strong>Arm Muscles:</strong> ${validateValue(
                reportData.bodyFatDetails.armMuscles,
                40,
                45
              )}</p>
              <p><strong>Leg Muscles:</strong> ${validateValue(
                reportData.bodyFatDetails.legMuscles,
                40,
                45
              )}</p>
            </div>
            <div class="details2 col">
              <h1>Fat Side Effects</h1>
              <hr/>
              <p><strong>Heart Disease:</strong> ${
                reportData.fatSideEffects.heartDisease
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>High Blood Pressure:</strong> ${
                reportData.fatSideEffects.highBloodPressure
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>High Blood Cholesterol:</strong> ${
                reportData.fatSideEffects.highBloodColestrol
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Diabetes:</strong> ${
                reportData.fatSideEffects.diabeties
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Headache:</strong> ${
                reportData.fatSideEffects.headAche
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Cancer:</strong> ${
                reportData.fatSideEffects.cancer
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Difficulty Breathing in Sleep:</strong> ${
                reportData.fatSideEffects.difficultyBreathinginSleep
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Tired Easily:</strong> ${
                reportData.fatSideEffects.tierdEasily
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Snoring in Sleep:</strong> ${
                reportData.fatSideEffects.snoringInSleep
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Stomach Issues:</strong> ${
                reportData.fatSideEffects.stomachIssues
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Menstrual Cycle Issues:</strong> ${
                reportData.fatSideEffects.menstrualCycleIssue
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Paralysis:</strong> ${
                reportData.fatSideEffects.paralysis
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Body Ache:</strong> ${
                reportData.fatSideEffects.bodyAche
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Weak Memory:</strong> ${
                reportData.fatSideEffects.weakMemory
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Darkening of Face:</strong> ${
                reportData.fatSideEffects.darkeningOfFace
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
              <p><strong>Hairfall:</strong> ${
                reportData.fatSideEffects.hairfall
                  ? '<i class="bi bi-check-square-fill checked"></i>'
                  : '<i class="bi bi-square unchecked"></i>'
              }</p>
            </div>
          </div>
          <div class="footer">
            <p>Generated using Report ProTM</p>
            <p>Report Pro is currently under development and under alpha testing.</p>
            <p>For any issues , bugs / glitches please reach out at dev.abhijeetshinde@gmail.com</p>
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(htmlContent);

  // Ensure the reports directory exists
  const reportsDir = path.join(__dirname, "../reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const pdfPath = path.join(reportsDir, `${reportData.reportId}.pdf`);
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();
  return pdfPath;
};

export default generatePDF;
