import Head from 'next/head';

export default function GoogleAnalytics() {
  return (
    <>
      {process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' ? (
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
          ></script>
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag("js", new Date());

              gtag("config", "${process.env.GOOGLE_ANALYTICS_ID}");`,
            }}
          />
        </Head>
      ) : null}
    </>
  );
}
