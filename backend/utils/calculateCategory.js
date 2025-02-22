const calculateCategory = (field, gender, value) => {
  const thresholds = {
    weight: {
      male: {
        low: [0, 50],
        normal: [50, 80],
        high: [80, 100],
        risk: [100, Infinity],
      },
      female: {
        low: [0, 45],
        normal: [45, 75],
        high: [75, 95],
        risk: [95, Infinity],
      },
    },
    bodyFat: {
      male: {
        low: [0, 10],
        normal: [10, 20],
        high: [20, 25],
        risk: [25, Infinity],
      },
      female: {
        low: [0, 15],
        normal: [15, 25],
        high: [25, 30],
        risk: [30, Infinity],
      },
    },
    visceralFat: {
      male: {
        low: [0, 1],
        normal: [1, 10],
        high: [10, 15],
        risk: [15, Infinity],
      },
      female: {
        low: [0, 1],
        normal: [1, 10],
        high: [10, 15],
        risk: [15, Infinity],
      },
    },
    restingMetabolism: {
      male: {
        low: [0, 1500],
        normal: [1500, 2000],
        high: [2000, 2500],
        risk: [2500, Infinity],
      },
      female: {
        low: [0, 1200],
        normal: [1200, 1800],
        high: [1800, 2200],
        risk: [2200, Infinity],
      },
    },
    bmi: {
      male: {
        low: [0, 18.5],
        normal: [18.5, 24.9],
        high: [25, 29.9],
        risk: [30, Infinity],
      },
      female: {
        low: [0, 18.5],
        normal: [18.5, 24.9],
        high: [25, 29.9],
        risk: [30, Infinity],
      },
    },
    bodyAge: {
      male: {
        low: [0, 20],
        normal: [20, 30],
        high: [30, 40],
        risk: [40, Infinity],
      },
      female: {
        low: [0, 20],
        normal: [20, 30],
        high: [30, 40],
        risk: [40, Infinity],
      },
    },
    wholeBodySubcutaneous: {
      male: {
        low: [0, 10],
        normal: [10, 20],
        high: [20, 25],
        risk: [25, Infinity],
      },
      female: {
        low: [0, 15],
        normal: [15, 25],
        high: [25, 30],
        risk: [30, Infinity],
      },
    },
    trunkFat: {
      male: {
        low: [0, 10],
        normal: [10, 20],
        high: [20, 25],
        risk: [25, Infinity],
      },
      female: {
        low: [0, 15],
        normal: [15, 25],
        high: [25, 30],
        risk: [30, Infinity],
      },
    },
    armFat: {
      male: {
        low: [0, 10],
        normal: [10, 20],
        high: [20, 25],
        risk: [25, Infinity],
      },
      female: {
        low: [0, 15],
        normal: [15, 25],
        high: [25, 30],
        risk: [30, Infinity],
      },
    },
    legFat: {
      male: {
        low: [0, 10],
        normal: [10, 20],
        high: [20, 25],
        risk: [25, Infinity],
      },
      female: {
        low: [0, 15],
        normal: [15, 25],
        high: [25, 30],
        risk: [30, Infinity],
      },
    },
    skeletalMuscle: {
      male: {
        low: [0, 30],
        normal: [30, 40],
        high: [40, 50],
        risk: [50, Infinity],
      },
      female: {
        low: [0, 25],
        normal: [25, 35],
        high: [35, 45],
        risk: [45, Infinity],
      },
    },
    trunkMuscles: {
      male: {
        low: [0, 30],
        normal: [30, 40],
        high: [40, 50],
        risk: [50, Infinity],
      },
      female: {
        low: [0, 25],
        normal: [25, 35],
        high: [35, 45],
        risk: [45, Infinity],
      },
    },
    armMuscles: {
      male: {
        low: [0, 30],
        normal: [30, 40],
        high: [40, 50],
        risk: [50, Infinity],
      },
      female: {
        low: [0, 25],
        normal: [25, 35],
        high: [35, 45],
        risk: [45, Infinity],
      },
    },
    legMuscles: {
      male: {
        low: [0, 30],
        normal: [30, 40],
        high: [40, 50],
        risk: [50, Infinity],
      },
      female: {
        low: [0, 25],
        normal: [25, 35],
        high: [35, 45],
        risk: [45, Infinity],
      },
    },
  };

  const fieldThresholds = thresholds[field];
  if (!fieldThresholds) {
    throw new Error(`Unknown field: ${field}`);
  }

  const genderThresholds = fieldThresholds[gender];
  if (!genderThresholds) {
    throw new Error(`Unknown gender: ${gender}`);
  }

  if (value < genderThresholds.low[1]) {
    return "low";
  } else if (
    value >= genderThresholds.normal[0] &&
    value <= genderThresholds.normal[1]
  ) {
    return "normal";
  } else if (
    value >= genderThresholds.high[0] &&
    value <= genderThresholds.high[1]
  ) {
    return "high";
  } else if (
    value >= genderThresholds.risk[0] &&
    value <= genderThresholds.risk[1]
  ) {
    return "risk";
  } else {
    return "unknown";
  }
};

export default calculateCategory;
