/* eslint-disable @next/next/no-css-tags */
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </Head>
      <body>
        <NextScript />
        <Main />
      </body>
    </Html>
  );
}
