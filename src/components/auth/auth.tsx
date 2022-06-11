import { useSession } from "next-auth/react";

const Auth = ({ children }: { children: any }) => {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <>Loading...</>;
  }

  return children;
};

export default Auth;
