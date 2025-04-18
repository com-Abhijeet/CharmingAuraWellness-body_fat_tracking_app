import React, { useEffect } from "react";
import { BodyFatDetails, CustomerDetails } from "../types/formTypes";
import { calculateIdealWeight } from "../utils/calculateWeights";

interface Props {
  formData: BodyFatDetails;
  setFormData: React.Dispatch<React.SetStateAction<BodyFatDetails>>;
  customerDetails: CustomerDetails;
}

const BodyFatDetailsForm: React.FC<Props> = ({
  formData,
  setFormData,
  customerDetails,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (formData.weight) {
      // Check if weight is entered
      const idealWeight = Number(
        calculateIdealWeight(customerDetails.gender, customerDetails.height)
      );

      const weightDifference = Number(
        (formData.weight - idealWeight).toPrecision(3)
      );

      setFormData((prevData) => ({
        ...prevData,
        idealWeight, // Update idealWeight in formData
        extraWeight: weightDifference > 0 ? weightDifference : 0, // If weight is more than ideal
        lessWeight: weightDifference < 0 ? Math.abs(weightDifference) : 0, // If weight is less than ideal
      }));

      console.log("Ideal Weight:", idealWeight);
      console.log("Weight Difference:", weightDifference);
    }
  }, [
    formData.weight,
    customerDetails.gender,
    customerDetails.height,
    setFormData,
  ]);

  return (
    <div className="body-fat-details form-container">
      <h2>Body Fat Diagnostics Report Data</h2>
      <hr />
      <div className="customer-overview mb-3">
        <p>
          <span>
            <strong>Customer:</strong> {customerDetails.name}
          </span>
          <span>
            <strong>Email:</strong> {customerDetails.email}
          </span>
          <span>
            <strong>Contact:</strong> {customerDetails.contact}
          </span>
        </p>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="weight" className="form-label">
            Weight <small>(kg)</small>
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-calendar"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
              placeholder="eg : 75"
              // value={formData.weight}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="idealWeight" className="form-label">
            Ideal Weight <small>(kg)</small>
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-graph-up"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="idealWeight"
              name="idealWeight"
              placeholder="eg : 65"
              value={formData.idealWeight}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="extraWeight" className="form-label">
            Extra Weight <small>(kg)</small>
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-plus-circle"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="extraWeight"
              name="extraWeight"
              placeholder="eg : 10"
              value={formData.extraWeight}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="lessWeight" className="form-label">
            Less Weight <small>(kg)</small>
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-dash-circle"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="lessWeight"
              name="lessWeight"
              placeholder="eg : 0"
              value={formData.lessWeight}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="bodyFat" className="form-label">
            Body Fat %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-droplet"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="bodyFat"
              name="bodyFat"
              placeholder="eg : 17"
              value={formData.bodyFat}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="visceralFat" className="form-label">
            Visceral Fat %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-droplet-half"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="visceralFat"
              name="visceralFat"
              placeholder="eg : 5"
              value={formData.visceralFat}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="restingMetabolism" className="form-label">
            Resting Metabolism
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-speedometer2"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="restingMetabolism"
              name="restingMetabolism"
              placeholder="eg : 1800"
              value={formData.restingMetabolism}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="bmi" className="form-label">
            BMI %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-bar-chart"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="bmi"
              name="bmi"
              placeholder="eg : 25"
              value={formData.bmi}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="bodyAge" className="form-label">
            Body Age <small>( Years )</small>
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-calendar"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="bodyAge"
              name="bodyAge"
              placeholder="eg : 25"
              value={formData.bodyAge}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="wholeBodySubcutaneous" className="form-label">
          Whole Body Subcutaneous %
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-droplet-fill"></i>
          </span>
          <input
            type="number"
            className="form-control"
            id="wholeBodySubcutaneous"
            name="wholeBodySubcutaneous"
            placeholder="eg : 25"
            value={formData.wholeBodySubcutaneous}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="trunkFat" className="form-label">
            Trunk Fat %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-droplet"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="trunkFat"
              name="trunkFat"
              placeholder="eg : 5"
              value={formData.trunkFat}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="armFat" className="form-label">
            Arm Fat %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-droplet"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="armFat"
              name="armFat"
              placeholder="eg : 5"
              value={formData.armFat}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="legFat" className="form-label">
            Leg Fat %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-droplet"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="legFat"
              name="legFat"
              placeholder="eg : 5"
              value={formData.legFat}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="skeletalMuscle" className="form-label">
            Skeletal Muscle %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-droplet"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="skeletalMuscle"
              name="skeletalMuscle"
              placeholder="eg : 5"
              value={formData.skeletalMuscle}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="trunkMuscles" className="form-label">
            Trunk Muscles %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-droplet"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="trunkMuscles"
              name="trunkMuscles"
              placeholder="eg : 5"
              value={formData.trunkMuscles}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="armMuscles" className="form-label">
            Arm Muscles %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-droplet"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="armMuscles"
              name="armMuscles"
              placeholder="eg : 5"
              value={formData.armMuscles}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="legMuscles" className="form-label">
            Leg Muscles %
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-droplet"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="legMuscles"
              name="legMuscles"
              placeholder="eg : 5"
              value={formData.legMuscles}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyFatDetailsForm;
