import clsx from "clsx";
import {
  AriaAttributes,
  DetailedHTMLProps,
  ProgressHTMLAttributes,
} from "react";

interface Props
  extends DetailedHTMLProps<
      ProgressHTMLAttributes<HTMLProgressElement>,
      HTMLProgressElement
    >,
    AriaAttributes {
  showPercentage?: boolean;
}

export const Progressbar = ({
  className,
  value,
  color,
  showPercentage = false,
}: Props) => {
  return (
    <div
      className={clsx("w-full h-3 bg-gray-200 rounded-3xl relative", className)}
    >
      <div
        className={clsx("h-full bg-blue-500 rounded-3xl transition-all", color)}
        style={{ width: value + "%" }}
      ></div>
      {showPercentage && (
        <p className="absolute top-0 bottom-0 left-0 right-0 text-xs font-bold leading-none text-center">
          {Number(value).toFixed(0)}%
        </p>
      )}
    </div>
  );
};
