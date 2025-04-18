import puppeteer from "puppeteer";
import thresholds from "../constants/thresholds.js";

const getSpeedometerConfig = (value, metric, gender, idealWeight) => {
  let low, normal, high, atRisk;

  if (metric === "weight") {
    // Define ranges based on idealWeight
    low = idealWeight - 6; // Below idealWeight - 6 is "Low"
    normal = idealWeight - 3; // Between idealWeight - 3 and idealWeight + 3 is "Normal"
    high = idealWeight + 3; // Between idealWeight + 3 and idealWeight + 6 is "High"
    atRisk = idealWeight + 6; // Above idealWeight + 6 is "At Risk"
  } else {
    // Validate gender and metric in thresholds
    if (!thresholds[gender]) {
      throw new Error(`Invalid gender: ${gender}`);
    }
    if (!thresholds[gender][metric]) {
      throw new Error(`Invalid metric: ${metric} for gender: ${gender}`);
    }

    // Use predefined thresholds for other metrics
    ({ low, normal, high, atRisk } = thresholds[gender][metric]);
  }

  const maxValue = atRisk; // Set maxValue to the "At Risk" threshold for consistent scaling

  // Ensure the value does not exceed the maxValue
  const adjustedValue = Math.min(value, maxValue);

  return {
    minValue: 0,
    maxValue, // Set maxValue to the "At Risk" threshold
    value: adjustedValue, // Use the adjusted value
    segments: 4,
    segmentColors: ["#FF4500", "#FFD700", "#90EE90", "#FF4500"], // Colors for Low, Normal, High, At Risk
    customSegmentStops: [0, low, normal, high, atRisk],
    customSegmentLabels: [
      {
        text: `Low (${low} - ${normal})`,
        CustomSegmentLabelPosition: "OUTSIDE",
        color: "#555",
      },
      {
        text: `Normal (${normal} - ${high})`,
        CustomSegmentLabelPosition: "OUTSIDE",
        color: "#555",
      },
      {
        text: `High (${high} - ${atRisk})`,
        CustomSegmentLabelPosition: "OUTSIDE",
        color: "#555",
      },
      {
        text: `At Risk (${atRisk}+)`,
        CustomSegmentLabelPosition: "OUTSIDE",
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
export { getSpeedometerConfig };

// Update the generateSVGs function to use getSpeedometerConfig
const generateSVGs = async (metrics, gender, idealWeight) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const svgs = [];

  for (const metric of metrics) {
    const { value, metricName } = metric;
    const config = getSpeedometerConfig(value, metricName, gender, idealWeight);

    // Set the HTML content for the speedometer
    const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #ffffff;
              }
              .speedometer {
                text-align: center;
                padding: 20px;
              }
              .speedometer svg {
                overflow: visible;
              }
              .speedometer h4 {
                font-size: 1.2rem;
                margin-bottom: 10px;
              }
            </style>
          </head>
          <body>
            <div class="speedometer">
              <h4>${metricName}</h4>
              <div id="speedometer"></div>
              <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
              <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
              <script src="https://unpkg.com/react-d3-speedometer/dist/index.js"></script>
              <script>
                ReactDOM.render(
                  React.createElement(ReactSpeedometer, ${JSON.stringify(
                    config
                  )}),
                  document.getElementById("speedometer")
                );
              </script>
            </div>
          </body>
        </html>
      `;

    try {
      await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });
      //   await page.screenshot({ path: `debug-${metricName}.png` });
      //   const pageContent = await page.content();
      //   console.log(pageContent);

      // Wait for the SVG element to appear
      await page.waitForSelector("svg", { timeout: 5000 });

      // Capture the SVG content
      const svgElement = await page.$("svg");
      const svgContent = await svgElement.evaluate((node) => node.outerHTML);

      svgs.push({ title: metricName, svg: svgContent });
    } catch (error) {
      console.error(`Failed to generate SVG for metric: ${metricName}`, error);
    }
  }

  await browser.close();

  return svgs;
};

export default generateSVGs;
