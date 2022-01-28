import { ReactNode, useRef } from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";

import { ProtectedLayout } from "../layouts/Protected.layout";

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const theme = useRef(extendTheme());

  return (
    <>
      <Head>
        <title>{Component.title || "React Graphql Monorepo"}</title>
        <meta name="description" content="React Graphql Monorepo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme.current}>
        {getLayout(
          Component.authenticate ? (
            <ProtectedLayout>
              <Component {...pageProps} />
            </ProtectedLayout>
          ) : (
            <Component {...pageProps} />
          )
        )}
      </ChakraProvider>
    </>
  );
}

export default MyApp;
