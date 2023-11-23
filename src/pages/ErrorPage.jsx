import Lottie from "lottie-react";
import errorAnimation from "../assets/animations/error_animation.json";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Lottie animationData={errorAnimation}></Lottie>
      </div>
    </div>
  );
};

export default ErrorPage;
