import { Button } from "@components/button";
import { FilePreview } from "@components/filepreview";
import { usePath } from "@hooks/usePath";

const Preview = () => {
  const path = usePath();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <FilePreview path={path} />
    </div>
  );
};

Preview.auth = true;

export default Preview;
