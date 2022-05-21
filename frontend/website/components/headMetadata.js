import Head from 'next/head';

export default function HeadMetadata({ title, metaDescription }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <meta
        name="google-site-verification"
        content={process.env.GOOGLE_VERIFICATION_ID}
      />
    </Head>
  );
}
