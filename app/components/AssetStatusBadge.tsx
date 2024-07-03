"use client";

import React from "react";

type AssetStatusBadgeProps = {
  variant: "operating" | "alert";
  className?: string;
  children: React.ReactNode;
};

const AssetStatusBadge: React.FC<AssetStatusBadgeProps> = ({
  variant,
  className,
  children,
}) => {
  const baseStyle = "px-2 p-1 rounded-lg text-xs text-white";
  let variantStyle = "";

  switch (variant) {
    case "operating":
      variantStyle = "bg-green-700";
      break;
    case "alert":
      variantStyle = "bg-red-700";
      break;
    default:
      break;
  }

  return (
    <span className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </span>
  );
};

export default AssetStatusBadge;
