import React from "react";
import { FatSideEffects } from "../types/formTypes";

interface FatSideEffectsFormProps {
  formData: FatSideEffects;
  setFormData: React.Dispatch<React.SetStateAction<FatSideEffects>>;
}

const FatSideEffectsForm: React.FC<FatSideEffectsFormProps> = ({
  formData,
  setFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    // console.log(`Checkbox ${name} changed to ${checked}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
    // console.log(`Updated formData:`, { ...formData, [name]: checked });
  };

  return (
    <div className="fat-side-effects form-container">
      <h2>Fat Side Effects</h2>
      <hr />
      <div className="form-content grid-container">
        <label className="grid-item">
          <input
            type="checkbox"
            name="heartDisease"
            checked={formData.heartDisease}
            onChange={handleChange}
          />
          Heart Disease
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="highBloodPressure"
            checked={formData.highBloodPressure}
            onChange={handleChange}
          />
          High Blood Pressure
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="highBloodColestrol"
            checked={formData.highBloodColestrol}
            onChange={handleChange}
          />
          High Blood Cholesterol
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="diabeties"
            checked={formData.diabeties}
            onChange={handleChange}
          />
          Diabetes
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="headAche"
            checked={formData.headAche}
            onChange={handleChange}
          />
          Headache
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="cancer"
            checked={formData.cancer}
            onChange={handleChange}
          />
          Cancer
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="difficultyBreathinginSleep"
            checked={formData.difficultyBreathinginSleep}
            onChange={handleChange}
          />
          Difficulty Breathing in Sleep
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="tierdEasily"
            checked={formData.tierdEasily}
            onChange={handleChange}
          />
          Tired Easily
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="snoringInSleep"
            checked={formData.snoringInSleep}
            onChange={handleChange}
          />
          Snoring in Sleep
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="stomachIssues"
            checked={formData.stomachIssues}
            onChange={handleChange}
          />
          Stomach Issues
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="menstrualCycleIssue"
            checked={formData.menstrualCycleIssue}
            onChange={handleChange}
          />
          Menstrual Cycle Issues
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="paralysis"
            checked={formData.paralysis}
            onChange={handleChange}
          />
          Paralysis
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="bodyAche"
            checked={formData.bodyAche}
            onChange={handleChange}
          />
          Body Ache
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="weakMemory"
            checked={formData.weakMemory}
            onChange={handleChange}
          />
          Weak Memory
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="darkeningOfFace"
            checked={formData.darkeningOfFace}
            onChange={handleChange}
          />
          Darkening of Face
        </label>
        <label className="grid-item">
          <input
            type="checkbox"
            name="hairfall"
            checked={formData.hairfall}
            onChange={handleChange}
          />
          Hairfall
        </label>
      </div>
    </div>
  );
};

export default FatSideEffectsForm;
