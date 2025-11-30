import React from "react";
import "../../src/bikeLoader.css";

const LoaderSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bike-loader">
        <div className="bike">
          <div className="wheel front"></div>
          <div className="wheel back"></div>
          <div className="body"></div>
        </div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default LoaderSpinner;
