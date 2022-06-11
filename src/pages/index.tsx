import { GetServerSideProps } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../components/button/button";

interface SignInResponse {
  error: string | null;
  status: number;
  ok: boolean;
  url: string | null;
}

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const { error, ok, url } = (await signIn("credentials", {
      password: password,
      callbackUrl: "/files",
      redirect: false,
    })) as any as SignInResponse;

    if (error) {
      setError("Invalid password provided");
      setIsLoading(false);
    }

    if (ok && url) {
      router.push(url);
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      {error && <p className="my-2 text-red-500">{error}</p>}
      <form
        onSubmit={handleOnSubmit}
        className="flex p-2 bg-white rounded-lg shadow-md"
      >
        <input
          type="password"
          placeholder="Enter a password"
          className="w-full h-10 mx-2 outline-none"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="p-2" isLoading={isLoading}>
          Login
        </Button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/files",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;

