import { toast } from "react-toastify";

export const addUser = async (user: {
  email: string;
  userName: string;
  password: string;
  role: string;
  phoneNumber?: string;
  address?: string;
}) => {
  try {
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${url}/user/registerByAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Failed to add user");
      return { success: false, message: errorData.message || "Failed to add user" };
    }

    const data = await response.json();
    toast.success(data.message);
    return { success: true, data };
  } catch (error: any) {
    console.error("Failed to add user:", error.message);
    toast.error("Failed to add user");
    return { success: false, message: error.message };
  }
};