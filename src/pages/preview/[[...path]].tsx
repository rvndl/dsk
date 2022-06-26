import { usePath } from "@hooks/usePath";

const Preview = () => {
  const path = usePath();

  return <div className="flex items-center justify-center h-full"></div>;
};

Preview.auth = true;

export default Preview;
