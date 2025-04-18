import React, { useState } from "react";
import { CustomerDetails } from "../types/formTypes";
import { searchCustomers as searchCustomersByQuery } from "../services/customerService";

interface Props {
  formData: CustomerDetails;
  setFormData: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  handleNext: () => void;
}

const CustomerDetailsForm: React.FC<Props> = ({
  formData,
  setFormData,
  handleNext,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CustomerDetails[]>([]);
  const [isCreatingNewCustomer, setIsCreatingNewCustomer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Handle search input changes with debounce
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      if (value.trim() !== "") {
        searchCustomers(value);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms debounce

    setDebounceTimeout(timeout);
  };

  // Fetch customers based on search query
  const searchCustomers = async (query: string) => {
    setIsLoading(true);
    try {
      const results = await searchCustomersByQuery(query);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //calculate age based on customer dob
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the current date is before the birth date in the current year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  // Handle selecting an existing customer
  const handleSelectCustomer = (customer: CustomerDetails) => {
    setFormData(customer);
    setSearchResults([]);
    setSearchQuery("");
    handleNext(); // Automatically move to the next step
  };

  // Handle creating a new customer
  const handleCreateNewCustomer = () => {
    setIsCreatingNewCustomer(true);
    setFormData({
      name: "",
      email: "",
      contact: "",
      age: "",
      gender: "",
      height: 0,
      dob: "",
      weight: 0,
      address: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="customer-details form-container">
      {!isCreatingNewCustomer ? (
        <>
          <h2>Select a existing customer</h2>
          <div className="mb-3">
            <label htmlFor="search" className="form-label">
              Search Customer (Name or Phone Number)
            </label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="search"
                placeholder="Search by name or phone number"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {isLoading && <p>Loading...</p>}
          {searchResults.length > 0 && (
            <ul className="list-group">
              {searchResults.map((customer) => (
                <li
                  key={customer._id} // Use a unique identifier like _id
                  className="list-group-item"
                  onClick={() => handleSelectCustomer(customer)}
                  style={{ cursor: "pointer" }}
                >
                  {customer.name} - {customer.contact} - {customer.email}
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={handleCreateNewCustomer}
          >
            <i className="bi bi-person-fill-add"></i>
            Create New Customer
          </button>
        </>
      ) : (
        <>
          <h2>Create New Customer</h2>
          <div className="row mb-3">
            {/* Name, Email, Contact */}
            <div className="col">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter full name"
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
                  <i className="bi bi-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Enter email address"
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
                  <i className="bi bi-telephone"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="contact"
                  name="contact"
                  placeholder="Enter phone number"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            {/* Gender, DOB, Age, Height */}
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
            </div>
            <div className="col">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-calendar-event"></i>
                </span>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={(e) => {
                    handleChange(e);
                    const age = calculateAge(e.target.value);
                    setFormData((prevData) => ({
                      ...prevData,
                      age: age.toString(),
                    }));
                  }}
                />
              </div>
            </div>
            <div className="col">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-calendar"></i>
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  readOnly
                />
              </div>
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
                  placeholder="Enter height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="row mb-3">
            {/* Weight, Address */}
            <div className="col">
              <label htmlFor="weight" className="form-label">
                Weight <small>(kg)</small>
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-calendar2-check"></i>
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="weight"
                  name="weight"
                  placeholder="Enter weight"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-geo-alt"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={() => setIsCreatingNewCustomer(false)}
          >
            Back to Search
          </button>
        </>
      )}
    </div>
  );
};

export default CustomerDetailsForm;
