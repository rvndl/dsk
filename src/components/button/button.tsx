import { SpinnerCircular } from "spinners-react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = ({ children, className, isLoading, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={"p-2 text-white  bg-blue-500 rounded-md " + className}
    >
      {isLoading ? <SpinnerCircular size={24} color="white" /> : children}
    </button>
  );
};

export default Button;