import Header from '../../../components/header';
import Footer from '../../../components/footer';

export default function PostsByTag({ tag }) {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="blog-posts-container">
        <h1>
          Blog posts tagged as <u>{tag}</u>
        </h1>
        <div className="blog-posts-list">
          <a href="/blog/post-title">
            <div className="blog-posts-list-item">
              <div className="blog-posts-thumbnail">
                <img src="https://assets.coderrocketfuel.com/coding-blog-nodejs-thumbnail.png" />
              </div>
              <div className="blog-posts-list-item-title-and-date">
                <h2>Your Blog Post Title</h2>
                <div className="blog-posts-list-item-date">
                  <span>5/1/2020</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// equivalent to static `getInitialProps` method declared on class component
export async function getServerSideProps({ query }) {
  return {
    props: {
      tag: query.tag,
    },
  };
}
