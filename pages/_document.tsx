import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Generate an essay in seconds." />
          <meta property="og:site_name" content="gptessay.com" />
          <meta
            property="og:description"
            content="Generate an essay seconds."
          />
          <meta property="og:title" content="LinkPlus" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Link Plus" />
          <meta
            name="twitter:description"
            content="Boost your LinkedIn Presence in seconds!"
          />
          <meta
            property="og:image"
            content="https://twitterbio.com/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://twitterbio.com/og-image.png"
          />
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
