import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  variant: "success" | "warning";
}

export const Badge = ({ variant, children }: Props) => (
  <span
    className={clsx(
      "inline-flex px-2 text-xs font-semibold leading-5 rounded-full",
      { "text-green-800 bg-green-100": variant === "success" },
      { "text-yellow-800 bg-yellow-100": variant === "warning" }
    )}
  >
    {children}
  </span>
);
