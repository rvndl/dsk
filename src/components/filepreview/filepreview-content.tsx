import { Button } from "@components/button";
import { IconDownload, IconDuplicate } from "@components/icon";
import { trpc } from "@utils/trpc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula as theme } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { SpinnerCircular } from "spinners-react";

interface Props {
  path: string[];
  filename: string;
}

export const FilePreviewContent = ({ path, filename }: Props) => {
  const { data, error, isFetching, isSuccess } = trpc.useQuery(
    ["file.get-content", { path: path.join("/") }],
    { refetchOnWindowFocus: false }
  );

  const extension = filename.split(".").pop();

  if (error || !isSuccess) {
    return <div>error</div>;
  }

  return (
    <div className="p-2 bg-white border contaienr border-slate-200 rounded-xl">
      <div className="flex p-2 border-b border-slate-200">
        <p className="text-lg font-semibold">{filename}</p>
        <div className="flex pl-8 ml-auto gap-x-2">
          <button className="flex items-center justify-center p-1 text-sm text-black border rounded-md w-7 h-7 bg-slate-50 text-red border-slate-200 hover:bg-slate-100">
            <IconDuplicate />
          </button>
          <button className="flex items-center justify-center p-1 text-sm text-white bg-blue-600 rounded-md w-7 h-7">
            <IconDownload />
          </button>
        </div>
      </div>
      {isFetching ? (
        <div className="flex flex-col items-center justify-center m-10">
          <SpinnerCircular size={38} color="#000" />
          <p className="mt-1 text-sm text-gray-500">Loading preview...</p>
        </div>
      ) : (
        <SyntaxHighlighter
          language={extension}
          style={theme}
          showLineNumbers
          customStyle={{ maxHeight: "80vh", margin: 0 }}
        >
          {data}
        </SyntaxHighlighter>
      )}
    </div>
  );
};
