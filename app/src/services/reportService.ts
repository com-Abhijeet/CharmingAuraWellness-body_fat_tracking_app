import { toast } from "react-toastify";
import { CustomerDetails } from "../types/formTypes";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const createReport = async (customerData : CustomerDetails, reportData : any) => {
  try {
    console.log(reportData);
    const response = await fetch(`${API_URL}/reports/create-report`, {
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