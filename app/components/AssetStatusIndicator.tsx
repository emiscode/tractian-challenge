import React from "react";

interface AssetStatusIndicatorProps {
  status: string;
}

const AssetStatusIndicator: React.FC<AssetStatusIndicatorProps> = ({
  status,
}) => {
  return (
    <span
      className={`inline-block ml-2 w-2 h-2 rounded-full ${
        status === "operating"
          ? "bg-green-500"
          : status === "alert"
          ? "bg-red-500"
          : ""
      }`}
    ></span>
  );
};

export default AssetStatusIndicator;
