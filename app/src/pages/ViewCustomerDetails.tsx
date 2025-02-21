import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerDetails,
  updateCustomer,
} from "../services/customerService";
import { fetchCustomerReports } from "../services/reportService";
import { CustomerDetails, Report } from "../types/formTypes";
import Sidebar from "../components/Sidebar";
import ReportStatisticsGraph from "../components/ReportStatisticsGraph";
import CustomerReportComparison from "../components/CustomerReportComparison";
import { setReports, clearReports } from "../redux/reportsSlice";
import ReportsTable from "../components/ReportsTable";

const ViewCustomerDetails = () => {
  const { email } = useParams<{ email: string }>();
  const dispatch = useDispatch();
  const reports = useSelector(
    (state: { reports: { reports: Report[] } }) => state.reports.reports
  );
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("weight");

  useEffect(() => {
    const getCustomerDetails = async () => {
      try {
        const data = await fetchCustomerDetails(email!);
        setCustomer(data);
        const reportsData = await fetchCustomerReports(data._id);
        dispatch(clearReports());
        dispatch(setReports(reportsData.reports));
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    getCustomerDetails();
  }, [email, dispatch]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      if (customer) {
        await updateCustomer(email!, customer);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer!,
      [name]: value,
    }));
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="view-customer-details content-container">
        <div className="container">
          <div className="customer-info">
            <h2>Customer Details</h2>
            <hr />
            {customer && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="row w-100">
                    <div className="col-md-4">
                      <label>Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={customer.name}
                          onChange={handleChange}
                        />
                      ) : (
                        <p>{customer.name}</p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label>Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={customer.email}
                          onChange={handleChange}
                        />
                      ) : (
                        <p>{customer.email}</p>
                      )}
                    </div>
                    <div className="col-md-4">
                      <label>Contact</label>
                      {isEditing ? (
                        <input
                          type="text"
                          className="form-control"
                          name="contact"
                          value={customer.contact}
                          onChange={handleChange}
                        />
                      ) : (
                        <p>{customer.contact}</p>
                      )}
                    </div>
                  </div>
                  {!isEditing && (
                    <span className="btn-edit" onClick={handleEdit}>
                      <i className="bi bi-pencil-fill"></i>
                      <span>Edit</span>
                    </span>
                  )}
                </div>
                <div className="row mb-3">
                  <div className="col-md-2">
                    <label>Age</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="age"
                        value={customer.age}
                        onChange={handleChange}
                      />
                    ) : (
                      <p>
                        {customer.age}
                        {" yrs"}
                      </p>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label>Height</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="height"
                        value={customer.height}
                        onChange={handleChange}
                      />
                    ) : (
                      <p>
                        {customer.height}
                        {" cm"}
                      </p>
                    )}
                  </div>
                  <div className="col-md-2">
                    <label>Weight</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="weight"
                        value={customer.weight}
                        onChange={handleChange}
                      />
                    ) : (
                      <p>
                        {customer.weight}
                        {" kg"}
                      </p>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label>Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="dob"
                        value={customer.dob}
                        onChange={handleChange}
                      />
                    ) : (
                      <p>{customer.dob}</p>
                    )}
                  </div>
                  <div className="col-md-3">
                    <label>Address</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        value={customer.address}
                        onChange={handleChange}
                      />
                    ) : (
                      <p>{customer.address}</p>
                    )}
                  </div>
                </div>
                {isEditing && (
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-success me-2"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* <hr /> */}
          </div>
          <div className="row mt-4">
            <div className="col-md-6">
              <h2>Metrics Over Time</h2>
              <select
                className="form-select"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="weight">Weight</option>
                <option value="bmi">BMI</option>
                <option value="bodyFat">Body Fat</option>
                <option value="visceralFat">Visceral Fat</option>
                {/* Add more options as needed */}
              </select>
              <ReportStatisticsGraph
                reports={reports}
                metric={selectedMetric}
              />
            </div>
            <div className="col-md-6">
              <CustomerReportComparison />
            </div>
          </div>
          <div className="mt-4">
            <h2>Past Reports</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weight</th>
                  <th>BMI</th>
                  <th>Body Fat</th>
                  <th>Visceral Fat</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report._id}>
                    <td>{new Date(report.createdAt!).toLocaleDateString()}</td>
                    <td>{report.bodyFatDetails.weight}</td>
                    <td>{report.bodyFatDetails.bmi}</td>
                    <td>{report.bodyFatDetails.bodyFat}</td>
                    <td>{report.bodyFatDetails.visceralFat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <ReportsTable
              page={0}
              totalPages={0}
              onPageChange={function (newPage: number): void {
                throw new Error("Function not implemented.");
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerDetails;
