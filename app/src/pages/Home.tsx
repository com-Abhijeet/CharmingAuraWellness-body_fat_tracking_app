import { useEffect } from "react";
import Navbar from "../components/Navbar";
import GradientText from "../components/ui/GradientText";
import SpotlightCard from "../components/ui/SpotLightCard";
import FadeContent from "../components/ui/FadeContent";
import ScrollReveal from "../components/ui/ScrollReveal";
import { initScrollBlob } from "../utils/scrollBob";
import ShinyText from "../components/ui/ShinyText";

const Home = () => {
  useEffect(() => {
    console.log("script loaded");
    initScrollBlob();
  }, []);

  return (
    <div className="homepage">
      <Navbar />
      <div className="container">
        <div className="center-blob"></div>
        <section className="jumbotron">
          <h1 className="display-4">
            <GradientText>Report Pro</GradientText>
          </h1>
          <p className="lead">
            Wellness report generation to CRM all at one place. Get data
            insights to diagnosis, AI suggestions to improve your wellness
            journey.
          </p>
        </section>
        <section className="about-section ">
          <h1 className="text-center">ABOUT</h1>
          <FadeContent
            blur={true}
            duration={1000}
            easing="ease-in"
            initialOpacity={0}
          >
            <div className="row mt-4">
              <div className="col-md-7 about-text">
                <p>
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                  >
                    At Report Pro, we are dedicated to providing comprehensive
                    wellness reports and data insights to help you on your
                    journey to better health. Our platform integrates seamlessly
                    with CRM systems to offer a holistic view of your wellness
                    data.
                  </ScrollReveal>
                </p>
                <p>
                  <ScrollReveal
                    baseOpacity={0}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                  >
                    Our AI-driven suggestions and personalized reviews are
                    designed to give you actionable insights to improve your
                    wellness journey. Whether you are tracking your progress or
                    looking for ways to enhance your health, Report Pro is here
                    to support you every step of the way.
                  </ScrollReveal>
                </p>
              </div>
              <div className="col-md-5 about-image">
                <img
                  src="/report-infographic.png"
                  alt="Report Infographic"
                  className="img-fluid"
                />
              </div>
            </div>
          </FadeContent>
        </section>
        <section className="features-section ">
          <h1 className="text-center">FEATURES</h1>
          <div className="row mt-4">
            <div className="col-md-4">
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="card-icon">
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <h5 className="card-title">Report Generation</h5>
                <p className="card-text">
                  Generate detailed reports to track your wellness progress.
                </p>
                <ShinyText
                  text="Learn More"
                  disabled={false}
                  speed={3}
                  className="btn shiny-btn"
                />
              </SpotlightCard>
            </div>
            <div className="col-md-4">
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="card-icon">
                  <i className="bi bi-bar-chart"></i>
                </div>
                <h5 className="card-title">Data Statistics</h5>
                <p className="card-text">
                  Access comprehensive data statistics to understand your health
                  better.
                </p>
                <ShinyText
                  text="Learn More"
                  disabled={false}
                  speed={3}
                  className="btn shiny-btn"
                />
              </SpotlightCard>
            </div>
            <div className="col-md-4">
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="card-icon">
                  <i className="bi bi-robot"></i>
                </div>
                <h5 className="card-title">Personalized AI Review</h5>
                <p className="card-text">
                  Coming soon: Get personalized AI reviews to enhance your
                  wellness journey.
                </p>
                <ShinyText
                  text="Learn More"
                  disabled={false}
                  speed={3}
                  className="btn shiny-btn"
                />
              </SpotlightCard>
            </div>
          </div>
        </section>
        <section className="pricing-section ">
          <h1 className="text-center">PRICING</h1>
          <div className="row mt-4">
            <div className="col-md-6">
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="card-icon">
                  <i className="bi bi-currency-rupee"></i>
                  <span>Free</span>
                </div>
                <h5 className="card-title">Basic</h5>
                <p className="card-text">
                  <ul>
                    <li>Unlimited customers</li>
                    <li>50 reports per month</li>
                    <li>300 emails per month</li>
                    <li>200 AI credits</li>
                  </ul>
                </p>
                <ShinyText
                  text="Buy Now"
                  disabled={false}
                  speed={3}
                  className="btn shiny-btn"
                />
              </SpotlightCard>
            </div>
            <div className="col-md-6">
              <SpotlightCard
                className="custom-spotlight-card"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="card-icon">
                  <i className="bi bi-currency-rupee"></i>
                  <span>699</span>
                  <small> /per month</small>
                </div>
                <h5 className="card-title">Premium</h5>
                <p className="card-text">
                  <ul>
                    <li>Unlimited customers</li>
                    <li>300 reports per month</li>
                    <li>1000 emails per month</li>
                    <li>1000 AI credits</li>
                  </ul>
                </p>
                <ShinyText
                  text="Buy now"
                  disabled={false}
                  speed={3}
                  className="btn shiny-btn"
                />
              </SpotlightCard>
            </div>
          </div>
        </section>
      </div>
      <footer className="homepage-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <p>Email: pspmtech2020@gmail.com</p>
            </div>
            <div className="col-md-4">
              <h5>Navigation</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About</a>
                </li>
                <li>
                  <a href="#features">Features</a>
                </li>
                <li>
                  <a href="#pricing">Pricing</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4 text-right">
            <p>All rights reserved @ PSPM Technologies</p>
            <p>contact developer @ dev.abhijeetshinde@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
