import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/linkpluslogo.png" />
          <meta name="description" content="Boost your LinkedIn in seconds!." />
          <meta property="og:site_name" content="linkplus.vercel.app" />
          <meta
            property="og:description"
            content="Boost your LinkedIn in seconds!."
          />
          <meta property="og:title" content="LinkPlus" />
          <meta name="image" property="og:image" content="/linkplushome.png" />
          <meta name="author" content="Phani Sai Ram Munipalli" />
          <meta property="og:type" content="Web Product" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="LinkPlus" />
          <meta
            name="twitter:description"
            content="Boost your LinkedIn Presence in seconds!"
          />
          {/* <meta
            property="og:image"
            content="https://twitterbio.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://twitterbio.com/og-image.png"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
