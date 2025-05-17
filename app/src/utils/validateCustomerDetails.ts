import { CustomerDetails } from "../types/formTypes";

interface ValidationErrors {
  [key: string]: string;
}

const validateCustomerDetails = (
  data: CustomerDetails
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name - required, only letters and spaces
  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z\s]+$/.test(data.name)) {
    errors.name = "Name can only contain letters and spaces";
  }

  // Email - required, valid email format
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(data.email)) {
    errors.email = "Invalid email address";
  }

  // Contact - required, exactly 10 digits
  if (!data.contact.trim()) {
    errors.contact = "Contact is required";
  } else if (!/^\d{10}$/.test(data.contact)) {
    errors.contact = "Contact must be exactly 10 digits";
  }

  // Gender - required
  if (!data.gender) {
    errors.gender = "Gender is required";
  }

  // DOB - required, valid date, year <= 2999
  if (!data.dob) {
    errors.dob = "Date of Birth is required";
  } else {
    const dobDate = new Date(data.dob);
    const year = dobDate.getFullYear();
    if (isNaN(dobDate.getTime())) {
      errors.dob = "Invalid date";
    } else if (year > 2999) {
      errors.dob = "Year must be 2999 or earlier";
    }
  }

  // Height - required, must be a number between 0 and 300
  if (data.height === undefined || data.height === null || data.height === 0) {
    errors.height = "Height is required";
  } else if (isNaN(Number(data.height)) || Number(data.height) <= 0 || Number(data.height) > 300) {
    errors.height = "Height must be a number between 1 and 300 cm";
  }

  // Weight - required, must be a number between 0 and 500
  if (data.weight === undefined || data.weight === null || data.weight === 0) {
    errors.weight = "Weight is required";
  } else if (isNaN(Number(data.weight)) || Number(data.weight) <= 0 || Number(data.weight) > 500) {
    errors.weight = "Weight must be a number between 1 and 500 kg";
  }

  // Address - required, non-empty, max length 250
  if (!data.address.trim()) {
    errors.address = "Address is required";
  } else if (data.address.length > 250) {
    errors.address = "Address must be less than 250 characters";
  }

  return errors;
};

export default validateCustomerDetails;
