import React, { useState } from "react";
import { CustomerDetails } from "../types/formTypes";
import validateInput from "../utils/validateInput";

interface Props {
  formData: CustomerDetails;
  setFormData: React.Dispatch<React.SetStateAction<CustomerDetails>>;
}

const CustomerDetailsForm: React.FC<Props> = ({ formData, setFormData }) => {
  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Validate input
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  return (
    <div className="customer-details form-container">
      <h2>
        <i className="bi bi-people-fill"></i>
        <span>Customer Details</span>
      </h2>
      <hr />
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              required
              placeholder="eg : john doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>
        <div className="col">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              placeholder="eg : johndoe@domain.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>
        <div className="col">
          <label htmlFor="contact" className="form-label">
            Contact
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-telephone-fill"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="contact"
              name="contact"
              required
              pattern="\d{10,15}"
              placeholder="eg : 9197949720"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
          {errors.contact && (
            <div className="text-danger">{errors.contact}</div>
          )}
        </div>
        <div className="col">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-gender-ambiguous"></i>
            </span>
            <select
              className="form-control"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {errors.gender && <div className="text-danger">{errors.gender}</div>}
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-calendar-fill"></i>
            </span>
            <input
              type="date"
              className="form-control"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
          {errors.dob && <div className="text-danger">{errors.dob}</div>}
        </div>
        <div className="col">
          <label htmlFor="age" className="form-label">
            Age <small>(years)</small>
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-hourglass-split"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="age"
              name="age"
              required
              placeholder="eg : 25"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          {errors.age && <div className="text-danger">{errors.age}</div>}
        </div>
        <div className="col">
          <label htmlFor="height" className="form-label">
            Height <small>(cm)</small>
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-rulers"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="height"
              name="height"
              required
              placeholder="eg : 172"
              value={formData.height}
              onChange={handleChange}
            />
            <span className="input-group-text">cm</span>
          </div>
          {errors.height && <div className="text-danger">{errors.height}</div>}
        </div>
        <div className="col">
          <label htmlFor="weight" className="form-label">
            Weight <small>(kg)</small>
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-calendar-fill"></i>
            </span>
            <input
              type="number"
              className="form-control"
              id="weight"
              name="weight"
              required
              placeholder="eg : 75"
              value={formData.weight}
              onChange={handleChange}
            />
            <span className="input-group-text">kg</span>
          </div>
          {errors.weight && <div className="text-danger">{errors.weight}</div>}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-house-fill"></i>
          </span>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            required
            placeholder="101, 123 Main St, New Mumbai, 200003"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        {errors.address && <div className="text-danger">{errors.address}</div>}
      </div>
    </div>
  );
};

export default CustomerDetailsForm;
