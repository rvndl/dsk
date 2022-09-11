import { useSession } from "next-auth/react";
import { SpinnerCircular } from "spinners-react";

export const Auth = ({ children }: { children: any }) => {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center p-4 bg-white border rounded-md gap-y-2">
          <p className="text-gray-700">Loading...</p>
          <SpinnerCircular size={38} color="#000" />
        </div>
      </div>
    );
  }

  return children;
};
