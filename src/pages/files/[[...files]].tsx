import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { trpc } from "../../utils/trpc";

const Files = () => {
  const router = useRouter();
  const slugs = router.query.files;

  const path = useMemo(() => {
    if (!slugs) return "/";

    return (slugs as string[]).join("/");
  }, [slugs]);

  const { data, error } = trpc.useQuery(["file.get-all"]);

  const files = useMemo(
    () => data?.filter(({ parent }) => parent === (path === "/" ? "." : path)),
    [data, path]
  );

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-2/3">
        <div className="w-full border rounded-lg border-slate-200">
          <div className="flex w-full p-4 font-semibold border-b border-slate-200">
            <p className="w-1/3">Name</p>
            <p className="w-1/3">Last modified</p>
            <p className="w-1/3">Size</p>
          </div>
          {files?.map((file) => (
            <Link href={`./${path}` + file.name}>
              <div className="flex w-full p-4 border-b cursor-pointer border-slate-200 hover:bg-slate-100">
                <p className="w-1/3">{file.name}</p>
                <p className="w-1/3">{file.type}</p>
                <p className="w-1/3">{file.size}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

Files.auth = true;

export default Files;
