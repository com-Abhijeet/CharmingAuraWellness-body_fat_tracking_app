import React from "react";
import { BodyFatDetails } from "../types/formTypes";

interface Props {
  formData: BodyFatDetails;
  setFormData: React.Dispatch<React.SetStateAction<BodyFatDetails>>;
}

const BodyFatDetailsForm: React.FC<Props> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="body-fat-details form-container">
      <h2>Body Fat Details</h2>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="weight" className="form-label">
            Weight
          </label>
          <input
            type="text"
            className="form-control"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label htmlFor="idealWeight" className="form-label">
            Ideal Weight
          </label>
          <input
            type="text"
            className="form-control"
            id="idealWeight"
            name="idealWeight"
            value={formData.idealWeight}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label htmlFor="extraWeight" className="form-label">
            Extra Weight
          </label>
          <input
            type="text"
            className="form-control"
            id="extraWeight"
            name="extraWeight"
            value={formData.extraWeight}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label htmlFor="lessWeight" className="form-label">
            Less Weight
          </label>
          <input
            type="text"
            className="form-control"
            id="lessWeight"
            name="lessWeight"
            value={formData.lessWeight}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="bodyFat" className="form-label">
            Body Fat %
          </label>
          <input
            type="text"
            className="form-control"
            id="bodyFat"
            name="bodyFat"
            value={formData.bodyFat}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="visceralFat" className="form-label">
              Visceral Fat %
            </label>
            <input
              type="text"
              className="form-control"
              id="visceralFat"
              name="visceralFat"
              value={formData.visceralFat}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="restingMetabolism" className="form-label">
          Resting Metabolism
        </label>
        <input
          type="text"
          className="form-control"
          id="restingMetabolism"
          name="restingMetabolism"
          value={formData.restingMetabolism}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bmi" className="form-label">
          BMI %
        </label>
        <input
          type="text"
          className="form-control"
          id="bmi"
          name="bmi"
          value={formData.bmi}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="bodyAge" className="form-label">
          Body Age
        </label>
        <input
          type="text"
          className="form-control"
          id="bodyAge"
          name="bodyAge"
          value={formData.bodyAge}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="wholeBodySubcutaneous" className="form-label">
          Whole Body Subcutaneous %
        </label>
        <input
          type="text"
          className="form-control"
          id="wholeBodySubcutaneous"
          name="wholeBodySubcutaneous"
          value={formData.wholeBodySubcutaneous}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="trunkFat" className="form-label">
          Trunk Fat %
        </label>
        <input
          type="text"
          className="form-control"
          id="trunkFat"
          name="trunkFat"
          value={formData.trunkFat}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="armFat" className="form-label">
          Arm Fat %
        </label>
        <input
          type="text"
          className="form-control"
          id="armFat"
          name="armFat"
          value={formData.armFat}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="legFat" className="form-label">
          Leg Fat %
        </label>
        <input
          type="text"
          className="form-control"
          id="legFat"
          name="legFat"
          value={formData.legFat}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="skeletalMuscle" className="form-label">
          Skeletal Muscle %
        </label>
        <input
          type="text"
          className="form-control"
          id="skeletalMuscle"
          name="skeletalMuscle"
          value={formData.skeletalMuscle}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="trunkMuscles" className="form-label">
          Trunk Muscles %
        </label>
        <input
          type="text"
          className="form-control"
          id="trunkMuscles"
          name="trunkMuscles"
          value={formData.trunkMuscles}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="armMuscles" className="form-label">
          Arm Muscles %
        </label>
        <input
          type="text"
          className="form-control"
          id="armMuscles"
          name="armMuscles"
          value={formData.armMuscles}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="legMuscles" className="form-label">
          Leg Muscles %
        </label>
        <input
          type="text"
          className="form-control"
          id="legMuscles"
          name="legMuscles"
          value={formData.legMuscles}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default BodyFatDetailsForm;
