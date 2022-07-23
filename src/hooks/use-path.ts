import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePath = (): [string[], string] => {
  const [path, setPath] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const { path } = router.query;
    if (!path) return setPath([]);

    setPath(path as string[]);
  }, [router]);

  return [path, path.join("/")];
};
