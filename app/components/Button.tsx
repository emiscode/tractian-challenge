"use client";

import React from "react";

type ButtonProps = {
  variant: "primary" | "secondary" | "outline";
  className?: string;
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ variant, className, children }) => {
  const baseStyle =
    "px-4 rounded focus:outline-none focus:shadow-outline text-sm py-2";
  let variantStyle = "";

  switch (variant) {
    case "primary":
      variantStyle = "bg-primary-blue text-white hover:bg-secondary-blue";
      break;
    case "secondary":
      variantStyle = "bg-secondary-blue text-white";
      break;
    case "outline":
      variantStyle =
        "bg-white text-gray-800 hover:bg-secondary-blue hover:text-white border border-secondary";
      break;
    default:
      break;
  }

  return (
    <button className={`${baseStyle} ${variantStyle} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
