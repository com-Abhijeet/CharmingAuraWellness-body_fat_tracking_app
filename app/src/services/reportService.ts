import { toast } from "react-toastify";
import { CustomerDetails } from "../types/formTypes";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createReport = async (customerData : CustomerDetails, reportData : any, createdByEmail : string) => {
  try {
    // console.log(reportData);
    const response = await fetch(`${API_URL}/reports/create-report/${createdByEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customerData, reportData }),
    });

    if (!response.ok) {
      throw new Error("Failed to create report");
    }

    const data = await response.json();
    toast.success(data.message);
    return data;
  } catch (error) {
    console.error("Error creating report:", error);
    throw error;
  }
};

export const fetchReports = async (page = 1, limit = 30, sortBy = "createdAt", sortOrder = "desc", userEmail : string) => {
  try {
    const response = await fetch(
      `${API_URL}/reports/get/${userEmail}?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch reports");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    toast.error("Error fetching reports");
    throw error;
  }
};

export const fetchCustomerReports = async (customerId: string) => {
  try {
    const response = await fetch(`${API_URL}/reports/get-customer-reports/${customerId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customer reports");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer reports:", error);
    toast.error("Error fetching customer reports");
    throw error;
  }
};

export const fetchStats = async (createdByEmail: string) => {
  try {
    const response = await fetch(`${API_URL}/reports/get-stats/${createdByEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch statistics");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    toast.error("Error fetching statistics");
    throw error;
  }
};

export const resendReportEmail = async (reportId: string) => {
  try {
    const response = await fetch(`${API_URL}/reports/resend-report-email/${reportId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to resend report email");
    }

    const data = await response.json();
    toast.success(data.message);
    return data;
  } catch (error) {
    console.error("Error resending report email:", error);
    toast.error("Error resending report email");
    throw error;
  }
};

