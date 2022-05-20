import Header from '../components/header';
import Footer from '../components/footer';
import HeadMetadata from '../components/headMetadata';

export default function Error({ statusCode }) {
  return (
    <div className="layout-wrapper">
      <HeadMetadata title="Error | Coding Blog" />
      <Header />
      <div className="error-container">
        {statusCode === 404 ? (
          <>
            <h1>404 Page Not Found</h1>
            <p>We can't seem to find the page you're looking for.</p>
          </>
        ) : (
          <>
            <h1>An Error Occurred</h1>
            <p>
              An error occurred when trying to fulfill your request. Please try
              reloading the page or going back to the homepage.
            </p>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req, res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;

  return {
    props: { statusCode },
  };
}
