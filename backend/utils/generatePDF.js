import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import QuickChart from "quickchart-js";
import thresholds from "../constants/thresholds.js";
import metricTitles from "../constants/metricTitles.js";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate QuickChart Speedometer URL
const generateSpeedometerUrl = (value, metric, gender, idealWeight) => {
  let low, normal, high, atRisk;

  if (metric === "weight") {
    low = idealWeight - 6;
    normal = idealWeight - 3;
    high = idealWeight + 3;
    atRisk = idealWeight + 6;
  } else {
    ({ low, normal, high, atRisk } = thresholds[gender][metric]);
  }

  // Calculate the actual max value based on thresholds
  const actualMaxValue = atRisk + (10 * atRisk) / 100;

  // Normalize the value to a percentage of the actual max value
  let normalizedValue = (value / actualMaxValue) * 100;
  normalizedValue = normalizedValue - 25;
  normalizedValue = Math.min(normalizedValue, 100); // Cap at 100%

  const valueFormatter = (originalValue) => {
    return `Value: ${originalValue.toFixed(1)}`; // Use the original value
  };

  // Create a QuickChart instance
  const chart = new QuickChart();
  chart.setConfig({
    type: "gauge",
    data: {
      datasets: [
        {
          value: normalizedValue,
          data: [25, 50, 75, 100],
          // data: [normal, high, atRisk, actualMaxValue],//  // Use normalized data for proportional segments
          backgroundColor: ["#FFD700", "#90EE90", "#ff7b00", "#FF4500"],
        },
      ],
      labels: [
        `Low\n (${low.toFixed(1)}-${normal.toFixed(1)})`,
        `Normal\n (${normal.toFixed(1)}-${high.toFixed(1)})`,
        `High\n (${high.toFixed(1)}-${atRisk.toFixed(1)})`,
        `At Risk\n (${atRisk.toFixed(1)}-${actualMaxValue.toFixed(1)})`,
      ],
    },
    options: {
      needle: {
        radiusPercentage: 2,
        widthPercentage: 3.2,
        lengthPercentage: 80,
        color: "rgba(0, 0, 0, 0.75)",
      },
      valueLabel: {
        display: false,
        formatter: () => valueFormatter(value),
      },
      plugins: {
        datalabels: {
          display: true,
          formatter: (val, ctx) => ctx.chart.data.labels[ctx.dataIndex],
          color: "#000",
          font: {
            size: 16,
          },
        },
      },
      gauge: {
        minValue: 0,
        maxValue: 100, // Use actual max value
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    },
  });

  return chart.getUrl();
};

// Generate PDF Report with Speedometers
const generatePDF = async (reportData, customerData, associateData) => {
  // console.log("report data", reportData);
  // console.log("customer data", customerData);
  // console.log("associate data", associateData);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const metrics = [
    "weight",
    "bodyFat",
    "visceralFat",
    "restingMetabolism",
    "bmi",
    "bodyAge",
    "wholeBodySubcutaneous",
    "trunkFat",
    "armFat",
    "legFat",
    "skeletalMuscle",
    "trunkMuscles",
    "armMuscles",
    "legMuscles",
  ];

  const gender = customerData.gender.toLowerCase();
  const idealWeight = reportData.bodyFatDetails.idealWeight;

  // Convert string values to numbers and generate charts
  const charts = metrics.map((metric) => {
    const value = parseFloat(reportData.bodyFatDetails[metric]); // Convert to number
    return {
      title: metricTitles[metric] || metric, // Use readable title or fallback to the metric name
      imageUrl: generateSpeedometerUrl(value, metric, gender, idealWeight),
      value: value.toFixed(1),
    };
  });

  // console.log(
  //   "Generated Chart URLs:",
  //   charts.map((chart) => chart.imageUrl)
  // );

  const htmlContent = `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
            flex-wrap: wrap; /* Allow wrapping on smaller screens */
        }
        .page-header{
          text-align : center;
          font-size: 24;
          border-bottom: 2px  solid #115A57;
        }
        .header h2 {
            flex-grow: 1;
            text-align: center;
            margin: 0;
        }
        .header h2 i {
            font-size: 24px;
        }
          
        .report-header {
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
        }
          
        .report-id {
            text-align: center;
            margin-bottom: 20px;
        }
          
        .report-id h3 {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            word-wrap: break-word; /* Ensure long text wraps */
        }
          
        .report-details-row {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap; /* Allow wrapping on smaller screens */
            gap: 20px;
        }
          
        .customer-details,
        .created-by-details {
            flex: 1;
            padding-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background-color: #fff;
            word-wrap: break-word; /* Ensure text wraps */
        }   
        .customer-details h4,
        .created-by-details h4 {
            font-size: 1.2rem;
            margin-bottom: 10px;
            color: #555;
            text-align: center;
            border-radius: 10px 10px 0 0;
            border-bottom: 1px solid var(--secondary-color);
            background-color: var(--secondary-color);
            color: var(--tertiary-color);
            padding: 10px;
        }
        .customer-details p,
        .created-by-details p {
            margin: 5px 20px;
            font-size: 1rem;
            color: #333;
            display: flex;
            justify-content: flex-start;
            word-wrap: break-word; /* Ensure text wraps */
         }
        .charts-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 25px;
          padding: 0 20px;
        }
        .chart {
          width: 300px;
          text-align:center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 20px;
          border: 2px solid #115A57;
          border-radius: 15px;
          page-break-inside: avoid; 
        }
        .chart h4{
          text-align : center;
          background-color : #115A57;
          border-radius: 10px 10px 0 0;
          color : #ffffff;
          font-weight : bold;
          margin-bottom : 10px;
          margin-top: 0;
          padding : 20px 0;
        }
        .chart img {
          width: 80%;
          margin: 0 10%;
          height: auto;
        }
        .chart-Value {
          text-align : center;
          background-color : #115A57;
          border-radius: 0 0 10px 10px;
          color : #ffffff;
          font-weight : bold;
          padding : 20px 0 20px 0;
        }
      </style>
    </head>
    <body>
        <!-- Page 1: Report Details -->
    <div class="page" style="background-color: #f9f9f9; padding: 40px;">
      <!-- Hero Section -->
      <div class="hero" style="text-align: center; margin-bottom: 30px;">
        <h1 style="font-size: 36px; color: #4caf50; margin-top: 20px;">Health & Wellness Report</h1>
        <p style="font-size: 18px; color: #555; margin-top: 10px;">Your personalized health insights and recommendations</p>
      </div>
  
      <!-- Key Information Section -->
      <div class="key-info" style="display: flex; justify-content: space-between; margin-bottom: 30px;">
        <!-- Report ID -->
        <div style="flex: 1; text-align: center; background: #e3f2fd; padding: 20px; border-radius: 10px; margin-right: 10px;">
          <h3 style="color: #333; margin-bottom: 10px;">Report ID</h3>
          <p style="font-size: 16px; color: #555;">${reportData.reportId}</p>
        </div>
        <!-- Customer Name -->
        <div style="flex: 1; text-align: center; background: #e3f2fd; padding: 20px; border-radius: 10px; margin-right: 10px;">
          <h3 style="color: #333; margin-bottom: 10px;">Customer</h3>
          <p style="font-size: 16px; color: #555;">${customerData.name}</p>
        </div>
        <!-- Associate Name -->
        <div style="flex: 1; text-align: center; background: #e3f2fd; padding: 20px; border-radius: 10px;">
          <h3 style="color: #333; margin-bottom: 10px;">Associate</h3>
          <p style="font-size: 16px; color: #555;">${associateData.userName}</p>
        </div>
      </div>
    
      <!-- Customer and Associate Details -->
      <div class="details-box" style="display: flex; justify-content: space-between; flex-wrap: wrap; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
        <!-- Customer Details -->
        <div class="detail" style="width: 48%; text-align: left;">
          <h3 style="color: #4caf50; margin-bottom: 10px;">Customer Details</h3>
          <p><strong>Email:</strong> ${customerData.email}</p>
          <p><strong>Contact:</strong> ${customerData.contact}</p>
          <p><strong>Address:</strong> ${customerData.address}</p>
          <p><strong>Gender:</strong> ${customerData.gender}</p>
          <p><strong>Age:</strong> ${customerData.age} years</p>
          <p><strong>Height:</strong> ${customerData.height} cm</p>
          <p><strong>Weight:</strong> ${customerData.weight} kg</p>
        </div>
    
        <!-- Associate Details -->
        <div class="detail" style="width: 48%; text-align: left;">
          <h3 style="color: #4caf50; margin-bottom: 10px;">Associate Details</h3>
          <p><strong>Email:</strong> ${associateData.email}</p>
          <p><strong>Contact:</strong> ${associateData.phoneNumber}</p>
          <p><strong>Address:</strong> ${associateData.address}</p>
        </div>
    </div>
  
    <!-- Importance of Regular Fitness Checkups -->
  <div class="fitness-checkup-info" style="margin-top: 30px; padding: 10px 20px; background-color: #e8f5e9; border-radius: 10px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #4caf50; text-align: center; margin-bottom: 15px;">Why Regular Fitness Checkups Matter</h2>
    <p style="font-size: 14px; color: #555; line-height: 1.4; margin: 0px;">
      Regular fitness checkups are essential for maintaining a healthy lifestyle. They help you:
    </p>
    <ul style="font-size: 14px; color: #555; line-height: 1.6; margin : 5px 0px 5px 20px">
      <li style="margin-bottom : 0px;">Identify potential health risks early and take preventive measures.</li>
      <li style="margin-bottom : 0px;">Track your progress and set realistic fitness goals.</li>
      <li style="margin-bottom : 0px;">Understand your body composition and overall health better.</li>
      <li style="margin-bottom : 0px;">Receive personalized recommendations for diet and exercise.</li>
    </ul>
    <p style="font-size: 14px; color: #555; line-height: 1.6;margin: 0px;">
      Make fitness checkups a part of your routine to stay proactive about your health and well-being.
    </p>
  </div>
  
  </div>
    <div class="page">
    <h2 class="page-header>Body Obesity Report</h2>
      <div class="charts-container">
        ${charts
          .map(
            (chart) => `
          <div class="chart">
            <h4>${chart.title}</h4>
            <img src="${chart.imageUrl}" />
            <span class="chart-value">${chart.title} : ${chart.value}</span>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
      
    </body>
  </html>
  `;

  await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

  // Wait for all images to load
  await page.waitForFunction(
    () => Array.from(document.images).every((img) => img.complete),
    { timeout: 10000 }
  );

  const reportsDir = path.join(__dirname, "../reports");
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir);
  }

  const pdfPath = path.join(reportsDir, `${reportData.reportId}.pdf`);
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    margin: { top: "1cm", bottom: "1cm", left: "1cm", right: "1cm" },
  });

  await browser.close();
  return pdfPath;
};

export default generatePDF;
