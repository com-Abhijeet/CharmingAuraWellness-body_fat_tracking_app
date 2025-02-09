import React from "react";
import { CustomerDetails } from "../types/formTypes";

interface Props {
  formData: CustomerDetails;
  setFormData: React.Dispatch<React.SetStateAction<CustomerDetails>>;
}

const CustomerDetailsForm: React.FC<Props> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="customer-details form-container">
      <h2>Customer Details</h2>
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
              value={formData.name}
              onChange={handleChange}
            />
          </div>
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>
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
              type="text"
              className="form-control"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
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
        </div>
        <div className="col">
          <label htmlFor="age" className="form-label">
            Age
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
              value={formData.age}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col">
          <label htmlFor="height" className="form-label">
            Height
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-rulers"></i>
            </span>
            <input
              type="text"
              className="form-control"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
            />
            <span className="input-group-text">cm</span>
          </div>
        </div>
        <div className="col">
          <label htmlFor="weight" className="form-label">
            Weight
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-calendar-fill"></i>
            </span>
            <input
              type="text"
              className="form-control"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
            <span className="input-group-text">kg</span>
          </div>
        </div>
      </div>
      <div className="row mb-3"></div>
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
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsForm;
