import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import { SpinnerCircular } from "spinners-react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

export const Button = ({
  children,
  variant = "primary",
  isLoading,
  className,
  ...rest
}: Props) => {
  const classes = clsx(
    "inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded shadow-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500",
    {
      "bg-sky-600 hover:bg-sky-700 border-transparent": variant === "primary",
    },
    {
      "text-gray-700 bg-white hover:bg-gray-50 border-gray-300":
        variant === "secondary",
    },
    className
  );

  return (
    <button {...rest} className={classes} {...rest}>
      {isLoading ? <SpinnerCircular size={24} color="white" /> : children}
    </button>
  );
};
