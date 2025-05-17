import React, { useEffect } from "react";
import { BodyFatDetails, CustomerDetails } from "../types/formTypes";
import { calculateIdealWeight } from "../utils/calculateWeights";
import validateBodyFatDetails from "../utils/validateBodyFatDetails";

interface Props {
  formData: BodyFatDetails;
  setFormData: React.Dispatch<React.SetStateAction<BodyFatDetails>>;
  customerDetails: CustomerDetails;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const BodyFatDetailsForm: React.FC<Props> = ({
  formData,
  setFormData,
  customerDetails,
  errors,
  setErrors,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    const validate = validateBodyFatDetails(formData);
    setErrors(validate);
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
              className={`form-control ${errors.weight ? "is-invalid" : ""}`}
              id="weight"
              name="weight"
              placeholder="eg : 75"
              value={formData.weight === 0 ? "" : formData.weight}
              onChange={handleChange}
            />
            {errors.weight && (
              <div className="invalid-feedback">{errors.weight}</div>
            )}
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
              className={`form-control ${
                errors.idealWeight ? "is-invalid" : ""
              }`}
              id="idealWeight"
              name="idealWeight"
              placeholder="eg : 65"
              readOnly
              value={formData.idealWeight === 0 ? "" : formData.idealWeight}
              onChange={handleChange}
            />
            {errors.idealWeight && (
              <div className="invalid-feedback">{errors.idealWeight}</div>
            )}
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
              className={`form-control ${
                errors.extraWeight ? "is-invalid" : ""
              }`}
              id="extraWeight"
              name="extraWeight"
              readOnly
              placeholder="eg : 10"
              value={formData.extraWeight === 0 ? "" : formData.extraWeight}
              onChange={handleChange}
            />
            {errors.extraWeight && (
              <div className="invalid-feedback">{errors.extraWeight}</div>
            )}
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
              className={`form-control ${
                errors.lessWeight ? "is-invalid" : ""
              }`}
              id="lessWeight"
              name="lessWeight"
              readOnly
              placeholder="eg : 0"
              value={formData.lessWeight === 0 ? "" : formData.lessWeight}
              onChange={handleChange}
            />
            {errors.lessWeight && (
              <div className="invalid-feedback">{errors.lessWeight}</div>
            )}
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
              className={`form-control ${errors.bodyFat ? "is-invalid" : ""}`}
              id="bodyFat"
              name="bodyFat"
              placeholder="eg : 17"
              value={formData.bodyFat === 0 ? "" : formData.bodyFat}
              onChange={handleChange}
            />
            {errors.bodyFat && (
              <div className="invalid-feedback">{errors.bodyFat}</div>
            )}
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
              className={`form-control ${
                errors.visceralFat ? "is-invalid" : ""
              }`}
              id="visceralFat"
              name="visceralFat"
              placeholder="eg : 5"
              value={formData.visceralFat === 0 ? "" : formData.visceralFat}
              onChange={handleChange}
            />
            {errors.visceralFat && (
              <div className="invalid-feedback">{errors.visceralFat}</div>
            )}
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
              className={`form-control ${
                errors.restingMetabolism ? "is-invalid" : ""
              }`}
              id="restingMetabolism"
              name="restingMetabolism"
              placeholder="eg : 1800"
              value={
                formData.restingMetabolism === 0
                  ? ""
                  : formData.restingMetabolism
              }
              onChange={handleChange}
            />
            {errors.restingMetabolism && (
              <div className="invalid-feedback">{errors.restingMetabolism}</div>
            )}
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
              className={`form-control ${errors.bmi ? "is-invalid" : ""}`}
              id="bmi"
              name="bmi"
              placeholder="eg : 25"
              value={formData.bmi === 0 ? "" : formData.bmi}
              onChange={handleChange}
            />
            {errors.bmi && <div className="invalid-feedback">{errors.bmi}</div>}
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
              className={`form-control ${errors.bodyAge ? "is-invalid" : ""}`}
              id="bodyAge"
              name="bodyAge"
              placeholder="eg : 25"
              value={formData.bodyAge === 0 ? "" : formData.bodyAge}
              onChange={handleChange}
            />
            {errors.bodyAge && (
              <div className="invalid-feedback">{errors.bodyAge}</div>
            )}
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
            className={`form-control ${
              errors.wholeBodySubcutaneous ? "is-invalid" : ""
            }`}
            id="wholeBodySubcutaneous"
            name="wholeBodySubcutaneous"
            placeholder="eg : 25"
            value={
              formData.wholeBodySubcutaneous === 0
                ? ""
                : formData.wholeBodySubcutaneous
            }
            onChange={handleChange}
          />
          {errors.wholeBodySubcutaneous && (
            <div className="invalid-feedback">
              {errors.wholeBodySubcutaneous}
            </div>
          )}
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
              className={`form-control ${errors.trunkFat ? "is-invalid" : ""}`}
              id="trunkFat"
              name="trunkFat"
              placeholder="eg : 5"
              value={formData.trunkFat === 0 ? "" : formData.trunkFat}
              onChange={handleChange}
            />
            {errors.trunkFat && (
              <div className="invalid-feedback">{errors.trunkFat}</div>
            )}
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
              className={`form-control ${errors.armFat ? "is-invalid" : ""}`}
              id="armFat"
              name="armFat"
              placeholder="eg : 5"
              value={formData.armFat === 0 ? "" : formData.armFat}
              onChange={handleChange}
            />
            {errors.armFat && (
              <div className="invalid-feedback">{errors.armFat}</div>
            )}
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
              className={`form-control ${errors.legFat ? "is-invalid" : ""}`}
              id="legFat"
              name="legFat"
              placeholder="eg : 5"
              value={formData.legFat === 0 ? "" : formData.legFat}
              onChange={handleChange}
            />
            {errors.legFat && (
              <div className="invalid-feedback">{errors.legFat}</div>
            )}
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
              className={`form-control ${
                errors.skeletalMuscle ? "is-invalid" : ""
              }`}
              id="skeletalMuscle"
              name="skeletalMuscle"
              placeholder="eg : 5"
              value={
                formData.skeletalMuscle === 0 ? "" : formData.skeletalMuscle
              }
              onChange={handleChange}
            />
            {errors.skeletalMuscle && (
              <div className="invalid-feedback">{errors.skeletalMuscle}</div>
            )}
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
              className={`form-control ${
                errors.trunkMuscles ? "is-invalid" : ""
              }`}
              id="trunkMuscles"
              name="trunkMuscles"
              placeholder="eg : 5"
              value={formData.trunkMuscles === 0 ? "" : formData.trunkMuscles}
              onChange={handleChange}
            />
            {errors.trunkMuscles && (
              <div className="invalid-feedback">{errors.trunkMuscles}</div>
            )}
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
              className={`form-control ${
                errors.armMuscles ? "is-invalid" : ""
              }`}
              id="armMuscles"
              name="armMuscles"
              placeholder="eg : 5"
              value={formData.armMuscles === 0 ? "" : formData.armMuscles}
              onChange={handleChange}
            />
            {errors.armMuscles && (
              <div className="invalid-feedback">{errors.armMuscles}</div>
            )}
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
              className={`form-control ${
                errors.legMuscles ? "is-invalid" : ""
              }`}
              id="legMuscles"
              name="legMuscles"
              placeholder="eg : 5"
              value={formData.legMuscles === 0 ? "" : formData.legMuscles}
              onChange={handleChange}
            />
            {errors.legMuscles && (
              <div className="invalid-feedback">{errors.legMuscles}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyFatDetailsForm;
