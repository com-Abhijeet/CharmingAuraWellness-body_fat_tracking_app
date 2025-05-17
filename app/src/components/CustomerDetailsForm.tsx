import React, { useEffect, useState } from "react";
import { CustomerDetails } from "../types/formTypes";
import { searchCustomers as searchCustomersByQuery } from "../services/customerService";
import { useSelector } from "react-redux";
import validateCustomerDetails from "../utils/validateCustomerDetails";

interface Props {
  formData: CustomerDetails;
  setFormData: React.Dispatch<React.SetStateAction<CustomerDetails>>;
  handleNext: () => void;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  isCreatingNewCustomer: boolean;
  setIsCreatingNewCustomer: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerDetailsForm: React.FC<Props> = ({
  formData,
  setFormData,
  handleNext,
  errors,
  setErrors,
  isCreatingNewCustomer,
  setIsCreatingNewCustomer,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<CustomerDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const user = useSelector((state: { user: { user: any } }) => state.user.user);
  const [customerSelected, setCustomerSelected] = useState(false);

  console.log("errors in customer form", errors);
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
      const results = await searchCustomersByQuery(query, user.email);
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

  //select customer
  useEffect(() => {
    if (customerSelected && formData.customerId) {
      handleNext();
      setCustomerSelected(false); // Reset for next time
    }
  }, [formData, customerSelected]);

  const handleSelectCustomer = (customer: CustomerDetails) => {
    setFormData(customer);
    setCustomerSelected(true);
    setSearchResults([]);
    setSearchQuery("");
    handleNext();
  };

  // Handle creating a new customer
  const handleCreateNewCustomer = () => {
    setIsCreatingNewCustomer(true);
    setFormData({
      customerId: "",
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
    const validation = validateCustomerDetails(formData);
    setErrors(validation);
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
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="search"
                placeholder="Search by name or phone number"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {!customerSelected && (
                <div className="invalid-feedback">
                  {"Customer Not Selected"}
                </div>
              )}
            </div>
          </div>
          {isLoading && <p>Loading...</p>}
          {searchResults.length > 0 ? (
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
          ) : (
            <ul className="list-group">
              <li className="list-group-item">No Customers Found</li>
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
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  name="name"
                  // pattern="[A-Za-z\s]+"
                  // title="Only letters are allowed"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[A-Za-z\s]*$/.test(value)) {
                      setFormData((prevData) => ({
                        ...prevData,
                        name: value,
                      }));
                    }
                  }}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
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
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  name="email"
                  placeholder="Enter email address"
                  // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  // title="Please enter a valid email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
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
                  className={`form-control ${
                    errors.contact ? "is-invalid" : ""
                  }`}
                  id="contact"
                  name="contact"
                  placeholder="Enter 10-digit contact number"
                  value={formData.contact}
                  maxLength={10}
                  minLength={10}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      setFormData((prev) => ({ ...prev, contact: value }));
                    }
                  }}
                />
                {errors.contact && (
                  <div className="invalid-feedback">{errors.contact}</div>
                )}
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
                  className={`form-control ${
                    errors.gender ? "is-invalid" : ""
                  }`}
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
                  className={`form-control ${errors.dob ? "is-invalid" : ""}`}
                  id="dob"
                  name="dob"
                  max="2999-12-31"
                  value={formData.dob}
                  onChange={(e) => {
                    const enteredDate = e.target.value;
                    const enteredYear = new Date(enteredDate).getFullYear();

                    if (enteredYear > 2999) {
                      alert("Please enter a year up to 2999 only.");
                      return; // Prevent setting the date
                    }

                    handleChange(e);
                    const age = calculateAge(enteredDate);
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
                  className={`form-control ${errors.age ? "is-invalid" : ""}`}
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
                  className={`form-control ${
                    errors.height ? "is-invalid" : ""
                  }`}
                  id="height"
                  name="height"
                  // min={0}
                  // maxLength={3}
                  placeholder="Enter height"
                  value={formData.height === 0 ? "" : formData.height}
                  onChange={handleChange}
                />
                {errors.height && (
                  <div className="invalid-feedback">{errors.height}</div>
                )}
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
                  className={`form-control ${
                    errors.weight ? "is-invalid" : ""
                  }`}
                  id="weight"
                  name="weight"
                  placeholder="Enter weight"
                  value={formData.weight === 0 ? "" : formData.weight}
                  onChange={handleChange}
                />
                {errors.weight && (
                  <div className="invalid-feedback">{errors.weight}</div>
                )}
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
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  id="address"
                  name="address"
                  maxLength={250}
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
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
