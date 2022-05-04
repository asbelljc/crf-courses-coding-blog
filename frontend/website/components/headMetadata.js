import Head from 'next/head';

export default function HeadMetadata({ title, metaDescription }) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
    </Head>
  );
}
