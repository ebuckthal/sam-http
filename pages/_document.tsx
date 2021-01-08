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
        <Head title="sam clovis + georgina baronian &amp; associates" />
        <body className="100vh">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

