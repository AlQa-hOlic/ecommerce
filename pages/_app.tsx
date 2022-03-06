import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "../styles/main.css";

function _App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={300}
      refetchOnWindowFocus={true}
    >
      <SWRConfig
        value={{
          refreshInterval: 0,
          revalidateOnFocus: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
}

export default _App;
