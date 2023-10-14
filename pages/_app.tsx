import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useEffect, useRef } from "react";

// import TagManager from "react-gtm-module";
// const tagManagerArgs = {
//   gtmId: "GTM-NVZM3MSX",
// };
// TagManager.initialize(tagManagerArgs);

// const gtmAnalyticsScript = `<!-- Google tag (gtag.js) -->
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-H5RVR17908"></script>
// <script>
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   gtag('js', new Date());

//   gtag('config', 'G-H5RVR17908');
// </script>`;

function MyApp({ Component, pageProps }: AppProps) {
  // const scriptRef = useRef<HTMLScriptElement | null>(null);

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.innerHTML = gtmAnalyticsScript;
  //   document.head.appendChild(script);

  //   scriptRef.current = script;

  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);

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
