import React from "react";
import Lottie from "react-lottie";
import * as animationData from "./graph-1.json";

const GraphBanner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} style={{ height: "100%" }} />;
};

export default GraphBanner;
