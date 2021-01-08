import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }
  render() {
    return (
      <Html>
        <Head title="sam clovis + georgina baronian &amp; associates">
          <link rel="preload" href="/1_0.mp4" as="video" type="video/mp4" />
          <link rel="preload" href="/1_1.mp4" as="video" type="video/mp4" />
          <link rel="preload" href="/1_2.mp4" as="video" type="video/mp4" />
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

