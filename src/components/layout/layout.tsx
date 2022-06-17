import { Navbar } from "@components/navbar";

export const Layout = ({ children }: any) => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <main className="main">{children}</main>
    </div>
  );
};
