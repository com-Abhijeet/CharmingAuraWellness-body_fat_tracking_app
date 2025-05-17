import Report from "../models/reportSchema.js";
import Customer from "../models/customerSchema.js";
import userModel from "../models/userSchema.js";
import {
  generateCustomerId,
  generateReportId,
} from "../utils/uniqueIdUtils.js";
// import generatePDF from "../utils/pdfGenerator.js";
import { sendPdfEmail } from "../communications/pdfEmailService.js";
import {
  calculateBodyFatStats,
  calculateSideEffectsStats,
} from "../utils/statsCalculation.js";
import express from "express";
import mongoose from "mongoose";
import { createPdfData } from "../utils/createPdfData.js";
import { generatePdfReport } from "../utils/generatePDF2.js";

const reportRouter = express.Router();

reportRouter.post("/create-report/:createdByEmail", async (req, res) => {
  try {
    const { customerData, reportData } = req.body;
    // console.log("customerdata", customerData);
    const createdByEmail = req.params.createdByEmail;
    let customerId = customerData.customerId;
    const customerEmail = customerData.email;
    // console.log(reportData);

    let customer;
    if (customerId) {
      customer = await Customer.findOne({ customerId: customerId });
    }

    customerId = await generateCustomerId(customerData.contact);
    if (!customer) {
      // Create a new customer if not exists
      const newCustomer = new Customer({
        customerId: customerId,
        name: customerData.name,
        email: customerData.email,
        contact: customerData.contact,
        age: customerData.age,
        gender: customerData.gender,
        height: customerData.height,
        weight: customerData.weight,
        dob: customerData.dob,
        address: customerData.address,
        createdBy: createdByEmail,
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

    const data = createPdfData(customerData, { ...reportData, reportId }, "70");
    const pdfPath = await generatePdfReport(data);
    sendPdfEmail(
      customerEmail,
      "Your Report",
      "Please find your report attached.",
      pdfPath,
      reportId
    );
    return res
      .status(200)
      .json({ message: "Report created successfully", reportId });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

reportRouter.get("/get/:userEmail", async (req, res) => {
  try {
    // console.log("Fetching reports");
    const userEmail = req.params.userEmail;
    const {
      page = 1,
      limit = 30,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const reports = await Report.find({ createdBy: userEmail })
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .populate("customer")
      .populate({
        path: "createdBy",
        model: userModel,
        localField: "createdBy",
        foreignField: "email",
        justOne: true,
      })
      .exec();

    const count = await Report.countDocuments({ createdBy: userEmail });

    return res.status(200).json({
      message: "Fetched successfully",
      reports,
      totalPages: Math.ceil(count / limitNumber),
      currentPage: pageNumber,
      totalReports: count, // Add totalReports to the response
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

reportRouter.get("/get-customer-reports/:customerId", async (req, res) => {
  try {
    // console.log("Fetching reports for customer");

    const customerId = req.params.customerId;
    // console.log("Customer ID:", customerId);

    const objectId = new mongoose.Types.ObjectId(customerId); // Convert to ObjectId

    const reports = await Report.find({ customer: objectId });

    // console.log("Reports found:", reports.length);
    return res.status(200).json({ message: "Fetched successfully", reports });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//export report stats for agent
reportRouter.get("/get-stats/:createdByEmail", async (req, res) => {
  try {
    const createdByEmail = req.params.createdByEmail;

    const reports = await Report.find({ createdBy: createdByEmail }).exec();

    const totalReports = reports.length;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    const reportsThisMonth = reports.filter(
      (report) => new Date(report.createdAt) >= startOfMonth
    ).length;

    const reportsThisWeek = reports.filter(
      (report) => new Date(report.createdAt) >= startOfWeek
    ).length;

    const reportsToday = reports.filter(
      (report) => new Date(report.createdAt) >= startOfDay
    ).length;

    const bodyFatStats = await calculateBodyFatStats(reports);
    const sideEffectsStats = await calculateSideEffectsStats(reports);

    return res.status(200).json({
      totalReports,
      reportsThisMonth,
      reportsThisWeek,
      reportsToday,
      bodyFatStats,
      sideEffectsStats,
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

reportRouter.post("/resend-report-email/:reportId", async (req, res) => {
  try {
    const reportId = req.params.reportId;
    const isReport = await Report.findOne({ reportId: reportId });
    if (!isReport) {
      return res.status(404).json({ message: "Report not found" });
    }
    const report = await Report.findOne({ reportId: reportId })
      .populate("customer")
      .populate({
        path: "createdBy",
        model: userModel,
        localField: "createdBy",
        foreignField: "email",
        justOne: true,
      });

    // console.log(report);

    const customerData = {
      name: report.customer.name,
      email: report.customer.email,
      contact: report.customer.contact,
      age: report.customer.age,
      dob: report.customer.dob,
      gender: report.customer.gender,
      height: report.customer.height,
      weight: report.customer.weight,
      address: report.customer.address,
    };

    const associateData = {
      name: report.createdBy.userName,
      email: report.createdBy.email,
      contact: report.createdBy.phoneNumber,
      role: report.createdBy.role,
      address: report.createdBy.address,
    };

    // Generate PDF
    const pdfPath = await generatePDF(report, customerData, associateData);

    // Send email with PDF attachment
    await sendPdfEmail(
      customerEmail,
      "Your Report",
      "Please find your report attached.",
      pdfPath,
      reportId
    );

    return res.status(200).json({ message: "Report resent successfully" });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default reportRouter;
