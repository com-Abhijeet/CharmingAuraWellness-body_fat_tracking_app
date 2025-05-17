import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import CustomerDetailsForm from "../components/CustomerDetailsForm";
import BodyFatDetailsForm from "../components/BodyFatDetailsForm";
import FatSideEffectsForm from "../components/FatSideEffectsForm";
import {
  CustomerDetails,
  BodyFatDetails,
  FatSideEffects,
} from "../types/formTypes";
import { createReport } from "../services/reportService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateReportLoadingOverlay from "../components/animations/createReportLoadingOverlay";
import validateCustomerDetails from "../utils/validateCustomerDetails";
import validateBodyFatDetails from "../utils/validateBodyFatDetails";

const CreateReport = () => {
  const user = useSelector((state: { user: { user: any } }) => state.user.user);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [isCreatingNewCustomer, setIsCreatingNewCustomer] = useState(false);

  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
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

  const [bodyFatDetails, setBodyFatDetails] = useState<BodyFatDetails>({
    reportId: "",
    customer: "",
    createdBy: user.email,
    weight: 0,
    idealWeight: 0,
    extraWeight: 0,
    lessWeight: 0,
    bodyFat: 0,
    visceralFat: 0,
    restingMetabolism: 0,
    bmi: 0,
    bodyAge: 0,
    wholeBodySubcutaneous: 0,
    trunkFat: 0,
    armFat: 0,
    legFat: 0,
    skeletalMuscle: 0,
    trunkMuscles: 0,
    armMuscles: 0,
    legMuscles: 0,
  });

  const [fatSideEffects, setFatSideEffects] = useState<FatSideEffects>({
    heartDisease: false,
    highBloodPressure: false,
    highBloodColestrol: false,
    diabeties: false,
    headAche: false,
    cancer: false,
    difficultyBreathinginSleep: false,
    tierdEasily: false,
    snoringInSleep: false,
    stomachIssues: false,
    menstrualCycleIssue: false,
    paralysis: false,
    bodyAche: false,
    weakMemory: false,
    darkeningOfFace: false,
    hairfall: false,
  });

  //handleNext
  const handleNext = () => {
    if (currentStep === 1) {
      const validationErrors = validateCustomerDetails(customerDetails);
      setErrors(validationErrors);
      console.log("validation errors", errors);
      const isValid = Object.keys(validationErrors).length === 0;

      if (!isValid) {
        toast.error(
          "Please fill in all required customer details before proceeding."
        );
        return;
      }
    } else if (currentStep === 2) {
      const validationErrors = validateBodyFatDetails(bodyFatDetails);
      setErrors(validationErrors);
      console.log("validation errors", errors);
      const isValid = Object.keys(validationErrors).length === 0;

      if (!isValid) {
        toast.error("Please fill in valid details before proceeding ");
        return;
      }
    }

    setErrors({}); // Clear previous errors
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const reportData = {
        ...bodyFatDetails,
        ...fatSideEffects,
      };
      const response = await createReport(
        customerDetails,
        reportData,
        user.email
      );
      if (response.status === 200) {
        toast("Report Created Successfully");
        navigate("/associate-dashboard");
      }
    } catch (error) {
      console.error("Error creating report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CreateReportLoadingOverlay />
      ) : (
        <div className="page-container">
          <Sidebar />
          <div className="content-container">
            <div className="container">
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <div>
                    <h4>Step 1: Customer Details</h4>
                    <CustomerDetailsForm
                      formData={customerDetails}
                      setFormData={setCustomerDetails}
                      handleNext={handleNext}
                      errors={errors}
                      setErrors={setErrors}
                      isCreatingNewCustomer={isCreatingNewCustomer}
                      setIsCreatingNewCustomer={setIsCreatingNewCustomer}
                    />
                    <div className="form-navigation">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleNext}
                      >
                        Next <i className="bi bi-arrow-right-circle-fill"></i>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h4>Step 2: Body Fat Details</h4>
                    <BodyFatDetailsForm
                      formData={bodyFatDetails}
                      setFormData={setBodyFatDetails}
                      customerDetails={customerDetails}
                      errors={errors}
                      setErrors={setErrors}
                    />
                    <div className="form-navigation">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handlePrevious}
                      >
                        <i className="bi bi-arrow-left-circle-fill"></i>
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleNext}
                      >
                        Next <i className="bi bi-arrow-right-circle-fill"></i>
                      </button>
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div>
                    <h4>Step 3: Fat Side Effects</h4>
                    <FatSideEffectsForm
                      formData={fatSideEffects}
                      setFormData={setFatSideEffects}
                    />
                    <div className="form-navigation">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handlePrevious}
                      >
                        <i className="bi bi-arrow-left-circle-fill"></i>
                        Previous
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Submit <i className="bi bi-check-circle-fill"></i>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateReport;
