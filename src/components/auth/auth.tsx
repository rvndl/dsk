import { useSession } from "next-auth/react";

export const Auth = ({ children }: { children: any }) => {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <>Loading...</>;
  }

  return children;
};
