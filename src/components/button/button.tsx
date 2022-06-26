import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { SpinnerCircular } from "spinners-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button = ({ children, className, isLoading, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={clsx(
        "p-2 text-white bg-blue-600 hover:bg-blue-700 transition-colors rounded-md",
        className
      )}
    >
      {isLoading ? <SpinnerCircular size={24} color="white" /> : children}
    </button>
  );
};
