import Report from "../models/reportSchema.js";
import Customer from "../models/customerSchema.js";
import { generateReportId } from "../utils/uniqueIdUtils.js";
import generatePDF from "../utils/pdfGenerator.js";
import { sendPdfEmail } from "../communications/pdfEmailService.js";
import express from "express";

const reportRouter = express.Router();

reportRouter.post("/create-report", async (req, res) => {
  try {
    const { customerData, reportData } = req.body;
    console.log(reportData);
    const customerEmail = customerData.email;

    // Check if the customer already exists
    let customer = await Customer.findOne({ email: customerEmail });

    if (!customer) {
      // Create a new customer if not exists
      const newCustomer = new Customer({
        name: customerData.name,
        email: customerEmail,
        contact: customerData.contact,
        age: customerData.age,
        height: customerData.height,
        weight: customerData.weight,
        dob: customerData.dob,
        address: customerData.address,
      });

      customer = await newCustomer.save();
    }

    const reportId = generateReportId();
    const newReport = new Report({
      customer: customer._id,
      reportId: reportId,
      createdBy: reportData.createdBy,
      bodyFatDetails: {
        weight: reportData.weight,
        idealWeight: reportData.idealWeight,
        extraWeight: reportData.extraWeight,
        lessWeight: reportData.lessWeight,
        bodyFat: reportData.bodyFat,
        visceralFat: reportData.visceralFat,
        restingMetabolism: reportData.restingMetabolism,
        bmi: reportData.bmi,
        bodyAge: reportData.bodyAge,
        wholeBodySubcutaneous: reportData.wholeBodySubcutaneous,
        trunkFat: reportData.trunkFat,
        armFat: reportData.armFat,
        legFat: reportData.legFat,
        skeletalMuscle: reportData.skeletalMuscle,
        trunkMuscles: reportData.trunkMuscles,
        armMuscles: reportData.armMuscles,
        legMuscles: reportData.legMuscles,
      },
      fatSideEffects: {
        heartDisease: reportData.heartDisease,
        highBloodPressure: reportData.highBloodPressure,
        highBloodColestrol: reportData.highBloodColestrol,
        diabeties: reportData.diabeties,
        headAche: reportData.headAche,
        cancer: reportData.cancer,
        difficultyBreathinginSleep: reportData.difficultyBreathinginSleep,
        tierdEasily: reportData.tierdEasily,
        snoringInSleep: reportData.snoringInSleep,
        stomachIssues: reportData.stomachIssues,
        menstrualCycleIssue: reportData.menstrualCycleIssue,
        paralysis: reportData.paralysis,
        bodyAche: reportData.bodyAche,
        weakMemory: reportData.weakMemory,
        darkeningOfFace: reportData.darkeningOfFace,
        hairfall: reportData.hairfall,
      },
    });

    await newReport.save();

    // Generate PDF
    const pdfPath = await generatePDF(newReport, customerData);

    // Send email with PDF attachment
    await sendPdfEmail(
      customerEmail,
      "Your Report",
      "Please find your report attached.",
      pdfPath,
      reportId
    );

    return res
      .status(201)
      .json({ message: "Report created successfully", reportId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default reportRouter;
