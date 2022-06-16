import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const usePath = () => {
  const [path, setPath] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const { path } = router.query;
    if (!path) return setPath([]);

    setPath(path as string[]);
  }, [router]);

  return path;
};
