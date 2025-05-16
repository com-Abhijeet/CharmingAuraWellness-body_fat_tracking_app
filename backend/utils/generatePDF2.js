import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const flattenObject = (obj, prefix = "") =>
  Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});

export const generatePdfReport = async (data) => {
  try {
    // console.log("Data passed to generatePdfReport:", data);

    // Define the output directory and ensure it exists
    const outputDir = path.join(__dirname, "reports");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Define the output file path
    const outputFilePath = path.join(outputDir, `report-${data.reportId}.pdf`);

    // Read the HTML template

    const templatePath = path.join(__dirname, "templates", "pdf.html");

    let html = fs.readFileSync(templatePath, "utf-8");

    // Flatten the data object
    const flattenedData = flattenObject(data);

    // Replace placeholders in the template with actual data
    Object.keys(flattenedData).forEach((key) => {
      const regex = new RegExp(`{{${key}}}`, "g");
      if (!html.includes(`{{${key}}}`)) {
        console.warn(`Placeholder {{${key}}} not found in the template.`);
      }
      html = html.replace(regex, flattenedData[key]);
    });

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    // Set page content
    await page.setContent(html, {
      waitUntil: "networkidle0", // Wait until the page is fully loaded
    });

    // Configure page settings
    await page.emulateMediaType("screen"); // Use screen media type for styling
    const pdfOptions = {
      path: outputFilePath, // Output file path
      format: "A4", // Standard A4 size
      printBackground: true, // Include background colors and images
      margin: {
        top: "0mm",
        bottom: "0mm",
        left: "0mm",
        right: "0mm",
      },
    };

    // Generate the PDF
    await page.pdf(pdfOptions);

    // Close Puppeteer
    await browser.close();

    console.log(`PDF generated successfully at: ${outputFilePath}`);

    // Return the file path for further use
    return outputFilePath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
