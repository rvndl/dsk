import { Navbar } from "@components/navbar";

export const Layout = ({ children }: any) => {
  return (
    <div className="">
      <Navbar />
      <main className="main">{children}</main>
    </div>
  );
};
