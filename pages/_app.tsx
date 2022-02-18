import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import { SessionProvider } from "next-auth/react";
import "../styles/main.css";

function _App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider
      session={session}
      refetchInterval={60}
      refetchOnWindowFocus={true}
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default _App;
