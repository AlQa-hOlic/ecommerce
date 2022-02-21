import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

import { fetcher } from "../graphql/fetcher";

import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "../styles/main.css";

function _App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={60}
      refetchOnWindowFocus={true}
    >
      <SWRConfig
        value={{
          refreshInterval: 60000,
          fetcher,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}

export default _App;
