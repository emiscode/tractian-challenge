import { twMerge } from "tailwind-merge";
import Loading from "./Loading";

type Props = {
  dark?: boolean;
  message?: string;
};

export function FullScreenLoading({ dark = false, message }: Props) {
  return (
    <div
      className={twMerge(
        "absolute inset-0 flex items-center justify-center z-50",
        dark ? "bg-black bg-opacity-75" : "bg-white bg-opacity-75"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <p
          className={twMerge(
            dark ? "text-white" : "text-black",
            "text-2xl p-4"
          )}
        >
          {message}
        </p>
        <Loading />
      </div>
    </div>
  );
}
