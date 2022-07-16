import clsx from "clsx";
import { useState } from "react";

export const UploadOverlay = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onDragEnter={() => setVisible(true)}
      onDragLeave={() => setVisible(false)}
      onDrag={(e) => {}}
    >
      {visible && (
        <div
          className={clsx(
            "absolute top-0 left-0 flex items-center justify-center w-screen h-screen text-white bg-black/50 z-10 pointer-events-auto"
          )}
        >
          asd
        </div>
      )}
    </div>
  );
};
