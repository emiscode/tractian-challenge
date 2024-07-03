type Props = {
  size: "xs" | "md" | "lg" | "sm";
};
const Spinner = ({ size }: Props) => {
  const dimensions = {
    md: "h-16 w-16",
    lg: "h-32 w-32",
    sm: "h-8 w-8",
    xs: "h-4 w-4",
  };
  return (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-gray-500 ${dimensions[size]}`}
    ></div>
  );
};

export default Spinner;
