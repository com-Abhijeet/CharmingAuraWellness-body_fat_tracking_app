import { toast } from "react-toastify";
import { CustomerDetails } from "../types/formTypes";

const API_URL = import.meta.env.VITE_BACKEND_URL;
const token = localStorage.getItem('token');

export const createCustomer = async (customerData: CustomerDetails) => {
  try {
    const response = await fetch(`${API_URL}/customers/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error("Failed to create customer");
    }

    const data = await response.json();
    toast.success("Customer created successfully");
    return data;
  } catch (error) {
    console.error("Error creating customer:", error);
    toast.error("Error creating customer");
    throw error;
  }
};

export const fetchCustomers = async (userEmail: string, page: number, limit: number) => {
  try {
    const response = await fetch(`${API_URL}/customers/get/${userEmail}?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customers");
    }

    const data = await response.json();
    toast(data.message);
    
    return data;

  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const fetchCustomerDetails = async (customerEmail: string) => {
  try {
    const response = await fetch(`${API_URL}/customers/customerDetails/${customerEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customer details");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer details:", error);
    toast.error("Error fetching customer details");
    throw error;
  }
};

export const updateCustomer = async (customerEmail: string, customerData: CustomerDetails) => {
  try {
    const response = await fetch(`${API_URL}/customers/update/${customerEmail}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error("Failed to update customer");
    }

    const data = await response.json();
    toast.success("Customer updated successfully");
    return data;
  } catch (error) {
    console.error("Error updating customer:", error);
    toast.error("Error updating customer");
    throw error;
  }
};

export const deleteCustomer = async (customerEmail: string) => {
  try {
    const response = await fetch(`${API_URL}/customers/delete/${customerEmail}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete customer");
    }

    const data = await response.json();
    toast.success("Customer deleted successfully");
    return data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    toast.error("Error deleting customer");
    throw error;
  }
};

export const fetchCustomerStats = async (createdByEmail: string) => {
  try {
    const response = await fetch(`${API_URL}/customers/customer-stats/${createdByEmail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch customer statistics");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customer statistics:", error);
    toast.error("Error fetching customer statistics");
    throw error;
  }
};