import thresholds from "../constants/thresholds.js";

export const calculateWeightCategory = (currentWeight, idealWeight) => {
  const weightDiff = currentWeight - idealWeight;
  // +- 3kgs  is considered normal
  if (Math.abs(weightDiff) <= 3) {
    return "Normal";
  }
  // + 3kgs is considered overweight
  else if (weightDiff > 3) {
    return "Overweight";
  }
  //  - 3kgs is considered underweight
  else {
    return "Underweight";
  }
};

export const calculateWeightChange = (currentWeight, previousWeight) => {
  const weightDiff = currentWeight - previousWeight;
  let weightChange;
  if (weightDiff > 0) {
    return (weightChange = {
      value: weightDiff,
      text: `You have gained ${weightDiff} kg`,
      direction: "top",
    });
  } else if (weightDiff < 0) {
    return (weightChange = {
      value: weightDiff,
      text: `You have lost ${Math.abs(weightDiff)} kg`,
      direction: "bottom",
    });
  } else {
    return (weightChange = {
      value: weightDiff,
      text: "Your weight is consistent",
      direction: "",
    });
  }
};

export const calculateBmi = (bmi) => {
  let status = "";
  if (bmi < 18.5) {
    status = "Underweight";
  } else if (bmi < 25) {
    status = "Normal";
  } else if (bmi < 30) {
    status = "Overweight";
  } else {
    status = "Obese";
  }
  return status;
};

export const calculateFatMass = (weight, bodyFatPercent) => {
  const value = weight * (bodyFatPercent / 100);
  let fatMass;
  let status = "";
  if (value < 10) {
    status = "Insufficient";
  } else if (value < 15) {
    status = "Standard";
  } else if (value < 20) {
    status = "High";
  }
  return (fatMass = {
    value: value,
    status: status,
  });
};

export const calculateSubcutaneous = (subcutaneous, gender) => {
  let status = "";
  let range = "";

  if (gender === "male") {
    range = ` ${thresholds.male.wholeBodySubcutaneous.normal} - ${thresholds.male.wholeBodySubcutaneous.high}`;
    if (subcutaneous < 8) {
      status = "Low";
    } else if (subcutaneous < 15) {
      status = "Standard";
    } else if (subcutaneous < 20) {
      status = "High";
    } else {
      status = "At Risk";
    }
  } else if (gender === "female") {
    range = ` ${thresholds.female.wholeBodySubcutaneous.normal} - ${thresholds.female.wholeBodySubcutaneous.high}`;
    if (subcutaneous < 15) {
      status = "Low";
    } else if (subcutaneous < 25) {
      status = "Standard";
    } else if (subcutaneous < 35) {
      status = "High";
    } else {
      status = "At Risk";
    }
  }

  return (subcutaneous = {
    value: subcutaneous,
    status: status,
  });
};

export const muscleMass = (skeletalMuscle, weight, gender) => {
  let status = "";
  let muscleMass;

  const value = weight * (skeletalMuscle / 100);
  if (gender == "male") {
    if (skeletalMuscle < thresholds.male.skeletalMuscle.normal) {
      status = "Low";
    } else if (skeletalMuscle < thresholds.male.skeletalMuscle.high) {
      status = "Standard";
    } else if (skeletalMuscle < thresholds.male.skeletalMuscle.atRisk) {
      status = "High";
    } else {
      status = "At Risk";
    }
  } else {
    if (skeletalMuscle < thresholds.female.skeletalMuscle.normal) {
      status = "Low";
    } else if (skeletalMuscle < thresholds.female.skeletalMuscle.high) {
      status = "Standard";
    } else if (skeletalMuscle < thresholds.female.skeletalMuscle.atRisk) {
      status = "High";
    } else {
      status = "At Risk";
    }
  }

  return (muscleMass = {
    value: value,
    status: status,
  });
};

export const boneMass = (fatMassValue, muscleMassValue, weight) => {
  let status = "";
  const value = weight - (fatMassValue + muscleMassValue);

  // Bone mass typically accounts for 12-15% of body weight
  const boneMassPercentage = (value / weight) * 100;

  if (boneMassPercentage < 10) {
    status = "Low";
  } else if (boneMassPercentage <= 15) {
    status = "Standard";
  } else if (boneMassPercentage <= 20) {
    status = "High";
  } else {
    status = "At Risk";
  }

  return {
    value: value.toFixed(2), // Rounded to 2 decimal places
    status: status,
  };
};

export const restingMetabolismRange = (restingMetabolism, gender) => {
  let range = "";
  if (gender === "male") {
    range = `${thresholds.male.restingMetabolism.normal} - ${thresholds.male.restingMetabolism.high}`;
  } else {
    range = `${thresholds.female.restingMetabolism.normal} - ${thresholds.female.restingMetabolism.high}`;
  }

  return (restingMetabolism = {
    value: restingMetabolism,
    range: range,
  });
};

export const generateBodyTypeMatrix = (fatMass, muscleRate) => {
  // Define the matrix dimensions (3x3 grid)
  const matrix = [
    ["row1.cell1Class", "row1.cell2Class", "row1.cell3Class"], // Top row
    ["row2.cell1Class", "row2.cell2Class", "row2.cell3Class"], // Middle row
    ["row3.cell1Class", "row3.cell2Class", "row3.cell3Class"], // Bottom row
  ];

  // Define thresholds for fatMass (x-axis) and muscleRate (y-axis)
  const fatMassThresholds = [10, 20, 30]; // Example thresholds for x-axis
  const muscleRateThresholds = [10, 20, 30]; // Example thresholds for y-axis

  // Determine the x-axis position (fatMass)
  let x = 0;
  if (fatMass > fatMassThresholds[1]) {
    x = 2; // High fatMass
  } else if (fatMass > fatMassThresholds[0]) {
    x = 1; // Medium fatMass
  }

  // Determine the y-axis position (muscleRate)
  let y = 0;
  if (muscleRate > muscleRateThresholds[1]) {
    y = 2; // High muscleRate
  } else if (muscleRate > muscleRateThresholds[0]) {
    y = 1; // Medium muscleRate
  }

  // Highlight the appropriate cell
  const highlightedMatrix = {};
  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      highlightedMatrix[cell] =
        rowIndex === y && colIndex === x ? "highlighted" : "";
    });
  });

  return highlightedMatrix;
};

export const calculateBodyAgeRange = (age) => {
  const range = `${age - 3} - ${age + 3}`;
  return range;
};
