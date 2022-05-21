import moment from 'moment';

import Header from '../../../components/header';
import Footer from '../../../components/footer';
import HeadMetadata from '../../../components/headMetadata';
import GoogleAnalytics from '../../../components/googleAnalytics';

import getBlogPostsByTag from '../../../api/getBlogPostsByTag';

export default function PostsByTag({ posts, tag, getDataError }) {
  return (
    <div className="layout-wrapper">
      <HeadMetadata
        title={`Blog posts tagged as "${tag}" | Coding Blog`}
        metaDescription={`All blog posts tagged as "${tag}".`}
      />
      <GoogleAnalytics />
      <Header />
      <div className="blog-posts-container">
        <h1>
          Blog posts tagged as <u>{tag}</u>
        </h1>
        <div className="blog-posts-list">
          {posts && !getDataError ? (
            posts.map((post, index) => (
              <a key={index} href={`/blog/${post.urlTitle}`}>
                <div className="blog-posts-list-item">
                  <img src={post.thumbnailImageUrl} />
                </div>
                <div className="blog-posts-list-item-title-and-date">
                  <h2>{post.title}</h2>
                  <div className="blog-posts-list-item-date">
                    <span>
                      {moment.unix(post.dateTimestamp).format('MMMM Do, YYYY')}
                    </span>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="blog-posts-get-data-error-msg">
              <span>An error occurred.</span>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// equivalent to static `getInitialProps` method declared on class component
export async function getServerSideProps({ query }) {
  const apiResult = await getBlogPostsByTag(query.tag);

  return {
    props: {
      posts: (apiResult && apiResult.posts) || null,
      tag: query.tag,
      getDataError: (apiResult && apiResult.getDataError) || null,
    },
  };
}
