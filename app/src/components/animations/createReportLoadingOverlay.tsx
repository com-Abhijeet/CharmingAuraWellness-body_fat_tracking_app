import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./loading.css";

const CreateReportLoadingOverlay = () => {
  return (
    <div className="loading-animation">
      <div className="loading-wrapper">
        <DotLottieReact
          src="https://lottie.host/395f475e-2abe-4241-8a9d-4543fe374bbe/WxxtGkrjLC.lottie"
          loop
          autoplay
          style={{ width: 200, height: 200 }}
        />
      </div>
    </div>
  );
};

export default CreateReportLoadingOverlay;
