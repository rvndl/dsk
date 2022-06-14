import { withTRPC } from "@trpc/next";
import {
  AppType,
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";
import { AppRouter } from "./api/trpc/[trpc]";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import Auth from "../components/auth/auth";

interface Props {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: Props) => {
  return (
    <SessionProvider session={session}>
      {(Component as any).auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = "http://localhost:3000/api/trpc";

    return {
      url,
    };
  },

  ssr: true,
})(MyApp);
