import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  sideText?: string;
}

export const Input = ({ sideText, className, ...rest }: Props) => {
  const classes = clsx(
    "block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm",
    className
  );

  if (sideText) {
    return (
      <div className="relative w-full group">
        <input className={classes} {...rest} />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <span
            className={clsx("text-gray-500 sm:text-sm", {
              "group-hover:mr-6": rest.type === "number",
              "group-hover:mr-0": rest.disabled,
            })}
          >
            {sideText}
          </span>
        </div>
      </div>
    );
  }

  return <input className={classes} {...rest} />;
};
