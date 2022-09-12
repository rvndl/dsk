import { InputHTMLAttributes, useId, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = ({ ...rest }: Props) => {
  return (
    <input
      type="checkbox"
      className="w-4 h-4 border-gray-300 rounded text-sky-600 focus:ring-sky-500"
      {...rest}
    />
  );
};
