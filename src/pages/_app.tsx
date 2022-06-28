import { withTRPC } from "@trpc/next";
import {
  AppType,
  NextComponentType,
  NextPageContext,
} from "next/dist/shared/lib/utils";
import { AppRouter } from "./api/trpc/[trpc]";
import { SessionProvider } from "next-auth/react";
import "@styles/globals.css";
import Auth from "@components/auth/auth";
import { Layout } from "@components/layout";
import Head from "next/head";

interface Props {
  Component: NextComponentType<NextPageContext, any, {}>;
  pageProps: any;
}

const MyApp: AppType = ({
  Component,
  pageProps: { session, ...pageProps },
}: Props) => {
  return (
    <>
      <Head>
        <title>dsk</title>
      </Head>
      <SessionProvider session={session}>
        <Layout>
          {(Component as any).auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </SessionProvider>
    </>
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
