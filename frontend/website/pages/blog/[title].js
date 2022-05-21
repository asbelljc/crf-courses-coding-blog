import { useEffect } from 'react';

import Prism from 'prismjs';
import moment from 'moment';

import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js';

import Header from '../../components/header';
import Footer from '../../components/footer';
import HeadMetadata from '../../components/headMetadata';
import GoogleAnalytics from '../../components/googleAnalytics';

import getBlogPostByUrlTitle from '../../api/getBlogPostByUrlTitle';

export default function Post({ post, getDataError, notFoundError }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="layout-wrapper">
      <HeadMetadata
        title={post ? post.seoTitleTag : 'Blog Post | Coding Blog'}
        metaDescription={post && post.seoMetaDescription}
      />
      <GoogleAnalytics />
      <Header />
      <div className="blog-post-container">
        {post && !getDataError && !notFoundError ? (
          <>
            <div className="blog-post-top-section">
              <h1>{post.title}</h1>
              <div className="blog-post-top-meta">
                <span>
                  {moment.unix(post.dateTimestamp).format('MMMM Do, YYYY')}
                </span>
                {post.tags.map((tag, index) => {
                  return (
                    <a
                      className="blog-post-top-tag-btn"
                      key={index}
                      href={`/blog/tags/${tag}`}
                    >
                      <span>{tag}</span>
                    </a>
                  );
                })}
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: post.markdownContent }}
              className="blog-post-body-content"
            ></div>
          </>
        ) : (
          <div className="blog-post-get-data-error-msg">
            {notFoundError ? (
              <span>Blog post not found</span>
            ) : (
              <span>An error occurred.</span>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const apiResult = await getBlogPostByUrlTitle(query.title);

  return {
    props: {
      post: (apiResult && apiResult.post) || null,
      getDataError: (apiResult && apiResult.getDataError) || null,
      notFoundError: (apiResult && apiResult.notFoundError) || null,
    },
  };
}
