import Header from '../../components/header';
import Footer from '../../components/footer';
import HeadMetadata from '../../components/headMetadata';

export default function Blog() {
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
