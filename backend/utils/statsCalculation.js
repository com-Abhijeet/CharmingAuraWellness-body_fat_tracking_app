export const calculateBodyFatStats = (reports) => {
  const stats = {
    weight: { low: Infinity, avg: 0, high: -Infinity },
    idealWeight: { low: Infinity, avg: 0, high: -Infinity },
    extraWeight: { low: Infinity, avg: 0, high: -Infinity },
    lessWeight: { low: Infinity, avg: 0, high: -Infinity },
    bodyFat: { low: Infinity, avg: 0, high: -Infinity },
    visceralFat: { low: Infinity, avg: 0, high: -Infinity },
    restingMetabolism: { low: Infinity, avg: 0, high: -Infinity },
    bmi: { low: Infinity, avg: 0, high: -Infinity },
    bodyAge: { low: Infinity, avg: 0, high: -Infinity },
    wholeBodySubcutaneous: { low: Infinity, avg: 0, high: -Infinity },
    trunkFat: { low: Infinity, avg: 0, high: -Infinity },
    armFat: { low: Infinity, avg: 0, high: -Infinity },
    legFat: { low: Infinity, avg: 0, high: -Infinity },
    skeletalMuscle: { low: Infinity, avg: 0, high: -Infinity },
    trunkMuscles: { low: Infinity, avg: 0, high: -Infinity },
    armMuscles: { low: Infinity, avg: 0, high: -Infinity },
    legMuscles: { low: Infinity, avg: 0, high: -Infinity },
  };

  const validKeys = Object.keys(stats);

  reports.forEach((report) => {
    const details = report.bodyFatDetails.toObject
      ? report.bodyFatDetails.toObject()
      : report.bodyFatDetails;
    for (const key in details) {
      if (details.hasOwnProperty(key) && validKeys.includes(key)) {
        const value = parseFloat(details[key]);
        if (!isNaN(value)) {
          stats[key].low = Math.min(stats[key].low, value);
          stats[key].high = Math.max(stats[key].high, value);
          stats[key].avg += value;
        }
      }
    }
  });

  for (const key in stats) {
    if (stats.hasOwnProperty(key)) {
      stats[key].avg = stats[key].avg / reports.length;
      if (stats[key].low === Infinity) stats[key].low = null;
      if (stats[key].high === -Infinity) stats[key].high = null;
    }
  }

  return stats;
};

export const calculateSideEffectsStats = (reports) => {
  const sideEffectsCount = {
    heartDisease: 0,
    highBloodPressure: 0,
    highBloodColestrol: 0,
    diabeties: 0,
    headAche: 0,
    cancer: 0,
    difficultyBreathinginSleep: 0,
    tierdEasily: 0,
    snoringInSleep: 0,
    stomachIssues: 0,
    menstrualCycleIssue: 0,
    paralysis: 0,
    bodyAche: 0,
    weakMemory: 0,
    darkeningOfFace: 0,
    hairfall: 0,
  };

  reports.forEach((report) => {
    const sideEffects = report.fatSideEffects.toObject
      ? report.fatSideEffects.toObject()
      : report.fatSideEffects;
    for (const key in sideEffects) {
      if (sideEffects.hasOwnProperty(key) && sideEffects[key]) {
        sideEffectsCount[key]++;
      }
    }
  });

  const sortedSideEffects = Object.entries(sideEffectsCount).sort(
    (a, b) => b[1] - a[1]
  );

  return sortedSideEffects;
};
