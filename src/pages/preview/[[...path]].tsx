import { Button } from "@components/button";
import { usePath } from "@hooks/usePath";
import { trpc } from "@utils/trpc";
import { isText } from "istextorbinary";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
const Preview = () => {
  const path = usePath();
  const { data, error, isSuccess } = trpc.useQuery([
    "file.get-content",
    { name: path.join("/") },
  ]);

  const fileName = path.at(-1);
  const previewable = isText(fileName);

  return (
    <div className="flex items-center justify-center h-full">
      {previewable && isSuccess ? (
        <div className="w-3/5 p-2 bg-white border contaienr border-slate-200 rounded-xl">
          <div className="flex p-2 border-b border-slate-200">
            <p className="text-lg font-semibold">{fileName}</p>
            <Button className="px-2 py-0.5 text-sm w-min ml-auto">
              Download
            </Button>
          </div>
          <SyntaxHighlighter
            language="js"
            style={dracula}
            showLineNumbers
            customStyle={{ maxHeight: "80vh", margin: 0 }}
          >
            {data}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div className="flex flex-col items-center p-4 bg-white border rounded-lg border-slate-200">
          <h2 className="font-semibold">This file cannot be previewed</h2>
          <div className="flex flex-col items-center mt-2 gap-y-1">
            <p className="">{fileName} - 34.4 MB</p>
            <Button className="px-2 py-0.5 text-sm w-min">Download</Button>
          </div>
        </div>
      )}
    </div>
  );
};

Preview.auth = true;

export default Preview;
