import { FilePreview } from "@components/file-preview";
import { usePath } from "@hooks/use-path";

const Preview = () => {
  const [path] = usePath();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <FilePreview path={path} />
    </div>
  );
};

Preview.auth = true;

export default Preview;
