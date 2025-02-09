import mongoose from "mongoose";

const bodyFatDetailsSchema = new mongoose.Schema(
  {
    weight: {
      type: Number,
    },
    idealWeight: {
      type: Number,
    },
    extraWeight: {
      type: Number,
    },
    lessWeight: {
      type: Number,
    },
    bodyFat: {
      type: String,
      required: true,
    },
    visceralFat: {
      type: String,
      required: true,
    },
    restingMetabolism: {
      type: String,
      required: true,
    },
    bmi: {
      type: String,
      required: true,
    },
    bodyAge: {
      type: String,
      required: true,
    },
    wholeBodySubcutaneous: {
      type: String,
      required: true,
    },
    trunkFat: {
      type: String,
      required: true,
    },
    armFat: {
      type: String,
      required: true,
    },
    legFat: {
      type: String,
      required: true,
    },
    skeletalMuscle: {
      type: String,
      required: true,
    },
    trunkMuscles: {
      type: String,
      required: true,
    },
    armMuscles: {
      type: String,
      required: true,
    },
    legMuscles: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const fatSideEffectsSchema = new mongoose.Schema({
  heartDisease: {
    type: Boolean,
    required: true,
    default: false,
  },
  highBloodPressure: {
    type: Boolean,
    required: true,
    default: false,
  },
  highBloodColestrol: {
    type: Boolean,
    required: true,
    default: false,
  },
  diabeties: {
    type: Boolean,
    required: true,
    default: false,
  },
  headAche: {
    type: Boolean,
    required: true,
    default: false,
  },
  cancer: {
    type: Boolean,
    required: true,
    default: false,
  },
  difficultyBreathinginSleep: {
    type: Boolean,
    required: true,
    default: false,
  },
  tierdEasily: {
    type: Boolean,
    required: true,
    default: false,
  },
  snoringInSleep: {
    type: Boolean,
    required: true,
    default: false,
  },
  stomachIssues: {
    type: Boolean,
    required: true,
    default: false,
  },
  menstrualCycleIssue: {
    type: Boolean,
    required: true,
    default: false,
  },
  paralysis: {
    type: Boolean,
    required: true,
    default: false,
  },
  bodyAche: {
    type: Boolean,
    required: true,
    default: false,
  },
  weakMemory: {
    type: Boolean,
    required: true,
    default: false,
  },
  darkeningOfFace: {
    type: Boolean,
    required: true,
    default: false,
  },
  hairfall: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const reportSchema = new mongoose.Schema({
  reportId: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    ref: "User",
    required: true,
  },
  customer: {
    type: String,
    ref: "Customer",
  },
  bodyFatDetails: bodyFatDetailsSchema,
  fatSideEffects: fatSideEffectsSchema,
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
