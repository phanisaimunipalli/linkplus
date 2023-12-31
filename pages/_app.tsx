import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useEffect, useRef } from "react";
import Hotjar from "@hotjar/browser";
import { hotjar } from "react-hotjar";

// const siteId = 3809852;
// const hotjarVersion = 6;

// Hotjar.init(siteId, hotjarVersion);

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hotjar.initialize(3809852, 6);
  }, []);
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey="{process.env.reCAPTCHA_Site_key}"
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Component {...pageProps} />
      <Analytics />
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
