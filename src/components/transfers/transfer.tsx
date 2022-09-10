import { IconCircleDown } from "@components/icon";
import { Progressbar } from "@components/ui";
import clsx from "clsx";

interface Props {
  name: string;
  percentage: number;
  type: "upload" | "download";
}

export const Transfer = ({ name, percentage, type }: Props) => (
  <div
    className="flex items-center justify-between w-full px-2 py-1 border-b border-b-gray-300"
    key={name}
  >
    <div className="flex items-center w-2/5">
      <div
        className={clsx(
          "shrink-0",
          { "text-blue-500 rotate-180": type === "upload" },
          { "text-green-500": type === "download" }
        )}
      >
        <IconCircleDown />
      </div>
      <p className="ml-1 text-sm font-medium text-gray-700 truncate">{name}</p>
    </div>
    <div className="flex items-center w-3/5">
      <Progressbar value={percentage} />
      <p className="ml-2 text-sm font-medium">{Math.round(percentage)}%</p>
    </div>
  </div>
);
