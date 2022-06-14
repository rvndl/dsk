import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...rest }: Props) => {
  return (
    <div>
      <input {...rest} />
    </div>
  );
};
