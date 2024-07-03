"use client";

import React from "react";

type ButtonProps = {
  variant: "primary" | "secondary" | "outline";
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  variant,
  className,
  children,
  onClick: handdleOnClick,
}) => {
  const baseStyle =
    "px-4 rounded focus:outline-none focus:shadow-outline text-sm py-2";
  let variantStyle = "";

  switch (variant) {
    case "primary":
      variantStyle = "bg-primary-blue text-white hover:bg-secondary-blue";
      break;
    case "secondary":
      variantStyle =
        "bg-secondary-blue text-white border border-secondary-blue";
      break;
    case "outline":
      variantStyle =
        "bg-white text-primary-blue hover:bg-secondary-blue hover:text-white border border-secondary";
      break;
    default:
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      onClick={handdleOnClick}
    >
      {children}
    </button>
  );
};

export default Button;
