import { IconChevronRight } from "@components/icon";
import { useTransferStore } from "@store/transfer";
import clsx from "clsx";
import { useState } from "react";
import { motion } from "framer-motion";
import { Transfer } from "./transfer";

export const Transfers = () => {
  const [minimalized, setMinimalized] = useState(false);
  const transfers = useTransferStore(({ transfers }) => transfers);

  if (transfers.length === 0) {
    return null;
  }

  return (
    <motion.div
      animate={{ width: minimalized ? "auto" : "24rem" }}
      transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      className={clsx("fixed bg-white shadow-md bottom-4 left-4 rounded-md")}
    >
      <div className="flex flex-row items-center h-10 px-4 py-2 bg-sky-500 rounded-t-md">
        {!minimalized && (
          <p className="text-base font-semibold text-black">File status</p>
        )}
        <div
          className={clsx(
            "ml-auto font-semibold cursor-pointer text-black/30 hover:text-black/70 transition-colors",
            minimalized ? "rotate-90" : "rotate-180"
          )}
          onClick={() => setMinimalized((b) => !b)}
        >
          <IconChevronRight />
        </div>
      </div>
      {!minimalized &&
        transfers.map(({ name, type, percentage }) => (
          <Transfer
            name={name}
            type={type}
            percentage={percentage}
            key={name}
          />
        ))}
    </motion.div>
  );
};
