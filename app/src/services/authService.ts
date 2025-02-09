import { Bounce, toast } from "react-toastify";
import {UAParser} from "ua-parser-js";

export const handleLogin = async (email: string, password: string) => {
  const sessionData = {
    ip: await getIpAddress(),
    device: getDeviceType(),
    browser: getBrowserType(),
    os: getOsType(),
    location: await getLocation(),
  };

  try {
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        ...sessionData,
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return { success: false, message: errorData.message || "Login failed" };
      }
      
      const data = await response.json();
      toast.success(data.message);
      console.log(data.message)
      return { success: true, data };
    } catch (error: any) {
      toast.error(error.message);
      console.error("Login failed:", error.message);
      return { success: false, message: error.message };
    }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${url}/user/request-password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message);
      throw new Error(errorData.message || "Failed to send password reset email");
    }

    const data = await response.json();
    console.log(data.message);
    toast.success(data.message);
    return { success: true, data };
  } catch (error: any) {
    toast.error(error.message);
    console.error("Failed to send password reset email:", error.message);
    return { success: false, message: error.message };
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const url = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${url}/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message);
      return { success: false, message: errorData.message || "Failed to reset password" };
    }

    const data = await response.json();
    toast.success(data.message);
    return { success: true, data };
  } catch (error: any) {
    toast.error(error.message);
    console.error("Failed to reset password:", error.message);
    return { success: false, message: error.message };
  }
};

const getIpAddress = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to get IP address:", error);
    return "";
  }
};

const getDeviceType = () => {
  const parser = new UAParser();
  const device = parser.getDevice();
  return device.type || "Unknown Device";
};

const getBrowserType = () => {
  const parser = new UAParser();
  const browser = parser.getBrowser();
  return browser.name || "Unknown Browser";
};

const getOsType = () => {
  const parser = new UAParser();
  const os = parser.getOS();
  return os.name || "Unknown OS";
};

const getLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by your browser");
        return resolve("Unknown Location");
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Failed to get location:", error);
          resolve("Unknown Location");
        }
    );
  });
};
