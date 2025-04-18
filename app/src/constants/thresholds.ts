const thresholds = {
    male: {
      bodyFat: { low: 0, normal: 10, high: 20, atRisk: 25 },
      visceralFat: { low: 0, normal: 10, high: 14, atRisk: 20 },
      restingMetabolism: { low: 1200, normal: 1600, high: 2000, atRisk: 2400 },
      bmi: { low: 0, normal: 18.5, high: 25, atRisk: 30 },
      bodyAge: { low: 15, normal: 20, high: 30, atRisk: 40 },
      wholeBodySubcutaneous: { low: 0, normal: 8, high: 15, atRisk: 20 },
      trunkFat: { low: 0, normal: 8, high: 15, atRisk: 20 },
      armFat: { low: 0, normal: 2, high: 4, atRisk: 6 },
      legFat: { low: 0, normal: 5, high: 10, atRisk: 15 },
      skeletalMuscle: { low: 25, normal: 33, high: 39, atRisk: 45 },
      trunkMuscles: { low: 15, normal: 20, high: 25, atRisk: 30 },
      armMuscles: { low: 1.5, normal: 2.5, high: 3.5, atRisk: 4.5 },
      legMuscles: { low: 5, normal: 7, high: 9, atRisk: 11 }
    },
    female: {
      bodyFat: { low: 0, normal: 18, high: 28, atRisk: 35 },
      visceralFat: { low: 0, normal: 8, high: 13, atRisk: 18 },
      restingMetabolism: { low: 1000, normal: 1300, high: 1600, atRisk: 1900 },
      bmi: { low: 0, normal: 18.5, high: 25, atRisk: 30 },
      bodyAge: { low: 15, normal: 20, high: 30, atRisk: 40 },
      wholeBodySubcutaneous: { low: 0, normal: 15, high: 25, atRisk: 35 },
      trunkFat: { low: 0, normal: 10, high: 18, atRisk: 25 },
      armFat: { low: 0, normal: 3, high: 5, atRisk: 7 },
      legFat: { low: 0, normal: 7, high: 13, atRisk: 18 },
      skeletalMuscle: { low: 20, normal: 27, high: 32, atRisk: 38 },
      trunkMuscles: { low: 12, normal: 17, high: 22, atRisk: 27 },
      armMuscles: { low: 1.2, normal: 2.2, high: 3.2, atRisk: 4.2 },
      legMuscles: { low: 4, normal: 6, high: 8, atRisk: 10 }
    }
  };

export default thresholds;