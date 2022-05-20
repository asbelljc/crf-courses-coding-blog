import moment from 'moment';

import Header from '../../components/header';
import Footer from '../../components/footer';
import HeadMetadata from '../../components/headMetadata';

import getAllBlogPosts from '../../api/getAllBlogPosts';

export default function Blog({ posts, getDataError }) {
  return (
    <div className="layout-wrapper">
      <HeadMetadata
        title="Blog Posts | Coding Blog"
        metaDescription="List of all blog posts published on the Jonathan Asbell coding blog."
      />
      <Header />
      <div className="blog-posts-container">
        <h1>Blog posts</h1>
        <div className="blog-posts-list">
          {posts && !getDataError ? (
            posts.map((post, index) => (
              <a key={index} href={`/blog/${post.urlTitle}`}>
                <div className="blog-posts-list-item">
                  <div className="blog-posts-thumbnail">
                    <img src={post.thumbnailImageUrl} />
                  </div>
                  <div className="blog-posts-list-item-title-and-date">
                    <h2>{post.title}</h2>
                    <div className="blog-posts-list-item-date">
                      <span>
                        {moment
                          .unix(post.dateTimestamp)
                          .format('MMMM Do, YYYY')}
                      </span>
                    </div>
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

export async function getServerSideProps() {
  const apiResult = await getAllBlogPosts();

  return {
    props: {
      posts: (apiResult && apiResult.posts) || null,
      getDataError: (apiResult && apiResult.getDataError) || null,
    },
  };
}
