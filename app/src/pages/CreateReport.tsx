import React, { useState } from "react";
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

const CreateReport = () => {
  const user = useSelector((state: { user: { user: any } }) => state.user.user);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

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

  const isCustomerDetailsValid = () => {
    const { name, email, contact, age, gender, height, dob, weight, address } =
      customerDetails;
    return (
      name.trim() &&
      email.trim() &&
      contact.trim() &&
      age.trim() &&
      gender.trim() &&
      height > 0 &&
      dob.trim() &&
      weight > 0 &&
      address.trim()
    );
  };

  const handleNext = () => {
    if (currentStep === 1 && !isCustomerDetailsValid()) {
      toast.error(
        "Please fill in all required customer details before proceeding."
      );
      return;
    }
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
