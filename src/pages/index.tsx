import { useState } from "react";
import Button from "../components/button/button";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <form
        onSubmit={handleOnSubmit}
        className="flex p-2 bg-white rounded-lg shadow-md"
      >
        <input
          type="password"
          placeholder="Enter a password"
          className="w-full h-10 mx-2 outline-none"
          name="password"
        />
        <Button
          className="p-2 text-white transition-transform duration-200 bg-blue-500 rounded-md"
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Home;

