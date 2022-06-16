import { Button } from "@components/button";
import { usePath } from "@hooks/usePath";

const Preview = () => {
  const path = usePath();

  const fileName = path.at(-1);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center p-4 border rounded-lg border-slate-200">
        <h2 className="font-semibold">This file cannot be previewed</h2>
        <div className="flex flex-col items-center mt-2 gap-y-1">
          <p className="">{fileName} - 34.4 MB</p>
          <Button className="px-2 py-0.5 text-sm w-min">Download</Button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
