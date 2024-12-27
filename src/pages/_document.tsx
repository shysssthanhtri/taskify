import { GeistSans } from "geist/font/sans";
import { Head, Html, Main, NextScript } from "next/document";

import { Metadata } from "@/config/metadata";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={Metadata.description} />
        <meta name="keywords" content={Metadata.keywords} />
        <meta property="og:title" content={Metadata.name} />
        <meta property="og:description" content={Metadata.description} />
        <meta property="og:url" content={Metadata.url} />
      </Head>
      <body className={GeistSans.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
