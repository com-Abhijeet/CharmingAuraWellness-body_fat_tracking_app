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
import useMediaQuery from "../hooks/useMediaQuery";
import { createReport } from "../services/reportService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Reports = () => {
  const user = useSelector((state: { user: { user: any } }) => state.user.user);
  const navigate = useNavigate();
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    contact: "",
    age: "",
    gender: "",
    height: "",
    dob: "",
    weight: "",
    address: "",
  });

  const [bodyFatDetails, setBodyFatDetails] = useState<BodyFatDetails>({
    reportId: "",
    customer: "",
    createdBy: user.email,
    weight: "",
    idealWeight: "",
    extraWeight: "",
    lessWeight: "",
    bodyFat: "",
    visceralFat: "",
    restingMetabolism: "",
    bmi: "",
    bodyAge: "",
    wholeBodySubcutaneous: "",
    trunkFat: "",
    armFat: "",
    legFat: "",
    skeletalMuscle: "",
    trunkMuscles: "",
    armMuscles: "",
    legMuscles: "",
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

  const [currentForm, setCurrentForm] = useState(1);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const nextForm = () => {
    setCurrentForm((prevForm) => prevForm + 1);
  };

  const prevForm = () => {
    setCurrentForm((prevForm) => prevForm - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        alert("Report submitted successfully");
        // console.log("Report created successfully:", response);

        // Clear the form
        setCustomerDetails({
          name: "",
          email: "",
          contact: "",
          age: "",
          gender: "",
          height: "",
          dob: "",
          weight: "",
          address: "",
        });
        setBodyFatDetails({
          reportId: "",
          customer: "",
          createdBy: user.email,
          weight: "",
          idealWeight: "",
          extraWeight: "",
          lessWeight: "",
          bodyFat: "",
          visceralFat: "",
          restingMetabolism: "",
          bmi: "",
          bodyAge: "",
          wholeBodySubcutaneous: "",
          trunkFat: "",
          armFat: "",
          legFat: "",
          skeletalMuscle: "",
          trunkMuscles: "",
          armMuscles: "",
          legMuscles: "",
        });
        setFatSideEffects({
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
      }
      navigate("/associate-dashboard");
    } catch (error) {
      // console.error("Error creating report:", error);
    }
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="content-container">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <CustomerDetailsForm
              formData={customerDetails}
              setFormData={setCustomerDetails}
            />
            {isMobile ? (
              <>
                {currentForm === 1 && (
                  <BodyFatDetailsForm
                    formData={bodyFatDetails}
                    setFormData={setBodyFatDetails}
                  />
                )}
                {currentForm === 2 && (
                  <FatSideEffectsForm
                    formData={fatSideEffects}
                    setFormData={setFatSideEffects}
                  />
                )}
                <div className="create-report form-navigation">
                  {currentForm > 1 && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={prevForm}
                    >
                      Previous
                    </button>
                  )}
                  {currentForm < 2 && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextForm}
                    >
                      Next
                    </button>
                  )}
                  {currentForm === 2 && (
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="row">
                <div className="col">
                  <BodyFatDetailsForm
                    formData={bodyFatDetails}
                    setFormData={setBodyFatDetails}
                  />
                </div>
                <div className="col">
                  <FatSideEffectsForm
                    formData={fatSideEffects}
                    setFormData={setFatSideEffects}
                  />
                </div>
                <div className="form-navigation">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Reports;
