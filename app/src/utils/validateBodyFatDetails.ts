import { BodyFatDetails } from "../types/formTypes";

interface ValidationErrors {
  [key: string]: string;
}

const validateBodyFatDetails = (data: BodyFatDetails): ValidationErrors => {
  const errors: ValidationErrors = {};

  const fourDigitMaxFields: (keyof BodyFatDetails)[] = ["restingMetabolism"];

  const excludeFields: (keyof BodyFatDetails)[] = ["reportId", "customer", "createdBy", "extraWeight", "lessWeight"];

  const allFields = (Object.keys(data) as (keyof BodyFatDetails)[]).filter(
    (field) => !excludeFields.includes(field)
  );

  allFields.forEach((field) => {
    const value = data[field];

    const label = formatLabel(field as string);

    if (value === undefined || value === null || value === 0) {
      errors[field as string] = `${label} is required`;
    } else if (isNaN(Number(value)) || Number(value) < 0) {
      errors[field as string] = `${label} must be greater than 0`;
    } else {
      const maxAllowed = fourDigitMaxFields.includes(field) ? 9999.9 : 999.9;
      if (Number(value) > maxAllowed) {
        errors[field as string] = `${label} must be ≤ ${maxAllowed}`;
      }
    }
  });

  return errors;
};

// Converts camelCase keys to readable labels
const formatLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
};

export default validateBodyFatDetails;
