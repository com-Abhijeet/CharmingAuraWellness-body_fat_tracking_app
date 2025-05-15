import { Key } from "react";
import { User } from "./userTypes";

export interface CustomerDetails {
  [x: string]: Key | null | undefined;
  customerId? : string;
  name: string;
  email: string;
  contact: string;
  age: string;
  gender : string;
  height: number;
  weight: number;
  dob: string;
  address: string;
}

export interface BodyFatDetails {
  [key: string]: string | number;
  reportId: string;
  customer: string;
  createdBy: string;
  weight: number;
  idealWeight: number;
  extraWeight: number;
  lessWeight: number;
  bodyFat: number;
  visceralFat: number;
  restingMetabolism: number;
  bmi: number;
  bodyAge: number;
  wholeBodySubcutaneous: number;
  trunkFat: number;
  armFat: number;
  legFat: number;
  skeletalMuscle: number;
  trunkMuscles: number;
  armMuscles: number;
  legMuscles: number;
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