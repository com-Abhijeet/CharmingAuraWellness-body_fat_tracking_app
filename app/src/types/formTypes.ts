import { User } from "./userTypes";

export interface CustomerDetails {
  name: string;
  email: string;
  contact: string;
  age: string;
  gender : string;
  height: string;
  weight: string;
  dob: string;
  address: string;
}

export interface BodyFatDetails {
  [key: string]: string;
  reportId: string;
  customer: string;
  createdBy: string;
  weight: string;
  idealWeight: string;
  extraWeight: string;
  lessWeight: string;
  bodyFat: string;
  visceralFat: string;
  restingMetabolism: string;
  bmi: string;
  bodyAge: string;
  wholeBodySubcutaneous: string;
  trunkFat: string;
  armFat: string;
  legFat: string;
  skeletalMuscle: string;
  trunkMuscles: string;
  armMuscles: string;
  legMuscles: string;
}

export interface FatSideEffects {
  heartDisease: boolean;
  highBloodPressure: boolean;
  highBloodColestrol: boolean;
  diabeties: boolean;
  headAche: boolean;
  cancer: boolean;
  difficultyBreathinginSleep: boolean;
  tierdEasily: boolean;
  snoringInSleep: boolean;
  stomachIssues: boolean;
  menstrualCycleIssue: boolean;
  paralysis: boolean;
  bodyAche: boolean;
  weakMemory: boolean;
  darkeningOfFace: boolean;
  hairfall: boolean;
}

export interface Report {
  _id: string;
  reportId : string;
  customer: CustomerDetails;
  createdBy : User; 
  bodyFatDetails :BodyFatDetails
  fatSideEffects: FatSideEffects;
  createdAt? :  string;
  updatedAt? : string;
}

export interface Stats {
  totalReports: number;
  reportsThisMonth: number;
  reportsThisWeek: number;
  reportsToday: number;
  bodyFatStats: {
    [key: string]: {
      low: number;
      avg: number;
      high: number;
    };
  };
  sideEffectsStats: [string, number][];
}