import React from "react";
import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className="relative w-full h-full z-50">
      <div className="flex items-center justify-center">
        <Spinner size="md" />
      </div>
    </div>
  );
};

export default Loading;
