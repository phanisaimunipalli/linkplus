import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useEffect } from "react";

import TagManager from "react-gtm-module";
const tagManagerArgs = {
  gtmId: "GTM-NVZM3MSX",
};
TagManager.initialize(tagManagerArgs);

// GTM scripts
// const gtmHeadScript = `<!-- Google Tag Manager -->
// <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-NVZM3MSX');</script>
// <!-- End Google Tag Manager -->`;

// const gtmBodyScript = `<!-- Google Tag Manager (noscript) -->
// <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NVZM3MSX"
// height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
// <!-- End Google Tag Manager (noscript) -->`;

const gtmAnalyticsScript = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-H5RVR17908"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-H5RVR17908');
</script>`;

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Insert head script
    // const headScript = document.createElement("script");
    // headScript.innerHTML = gtmHeadScript;
    // document.head.appendChild(headScript);

    // // Insert body script
    // const bodyScript = document.createElement("script");
    // bodyScript.innerHTML = gtmBodyScript;
    // document.body.appendChild(bodyScript);

    const analyticsScript = document.createElement("script");
    analyticsScript.innerHTML = gtmAnalyticsScript;
    document.body.appendChild(analyticsScript);

    return () => {
      document.head.removeChild(analyticsScript);
      // document.body.removeChild(bodyScript);
    };
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
