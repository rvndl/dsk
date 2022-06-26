import { Button } from "@components/button";
import { trpc } from "@utils/trpc";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface Props {
  path: string[];
  filename: string;
}

export const FilePreviewContent = ({ path, filename }: Props) => {
  const { data, error, isSuccess } = trpc.useQuery([
    "file.get-content",
    { name: path.join("/") },
  ]);

  if (!data) {
    return null;
  }

  return (
    <div className="w-3/5 p-2 bg-white border contaienr border-slate-200 rounded-xl">
      <div className="flex p-2 border-b border-slate-200">
        <p className="text-lg font-semibold">{filename}</p>
        <Button className="px-2 py-0.5 text-sm w-min ml-auto">Download</Button>
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
  );
};
