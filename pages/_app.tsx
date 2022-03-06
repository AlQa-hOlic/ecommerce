import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "../styles/main.css";
import { CartProvider } from "../lib/context/cart";

function _App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

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
        {router.asPath.startsWith("/admin") ? (
          <Component {...pageProps} />
        ) : (
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        )}
      </SWRConfig>
    </SessionProvider>
  );
}

export default _App;
