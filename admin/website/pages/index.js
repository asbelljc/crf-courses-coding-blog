import { useState } from 'react';

import moment from 'moment';

import Head from 'next/head';

import Header from '../components/header';
import Sidebar from '../components/sidebar';

import getAllPosts from '../api/blog-posts/getAllPosts.js';

export default function Home({ activePosts, upcomingPosts, getDataError }) {
  const [activePostsShown, setActivePostsShown] = useState(true);
  const [upcomingPostsShown, setUpcomingPostsShown] = useState(false);

  const handleActiveBtnClick = () => {
    setActivePostsShown(true);
    setUpcomingPostsShown(false);
  };

  const handleUpcomingBtnClick = () => {
    setActivePostsShown(false);
    setUpcomingPostsShown(true);
  };

  return (
    <div className="layout-wrapper">
      <Head>
        <title>Blog Posts | Admin</title>
      </Head>
      <Header />
      <Sidebar page="blog-posts" />
      <div className="layout-content-container">
        <div className="blog-posts-content">
          <div className="blog-posts-top-header">
            <div className="blog-posts-page-label">
              <span>All Blog Posts</span>
            </div>
            <div className="blog-posts-add-new-btn-container">
              <a href="/blog/create-new-post">
                <div className="blog-posts-add-new-btn">
                  <span>+ Add New Post</span>
                </div>
              </a>
            </div>
          </div>
          <div className="blog-posts-list-container">
            {!getDataError ? (
              <>
                <div className="blog-posts-list-tab-btns">
                  <div className="blog-posts-list-tab-btn-container">
                    <div
                      className={
                        activePostsShown
                          ? 'blog-posts-list-tab-btn active'
                          : 'blog-posts-list-tab-btn'
                      }
                      onClick={handleActiveBtnClick}
                    >
                      <span>Active</span>
                    </div>
                  </div>
                  <div className="blog-posts-list-tab-btn-container">
                    <div
                      className={
                        upcomingPostsShown
                          ? 'blog-posts-list-tab-btn active'
                          : 'blog-posts-list-tab-btn'
                      }
                      onClick={handleUpcomingBtnClick}
                    >
                      <span>Upcoming</span>
                    </div>
                  </div>
                </div>
                <div className="blog-posts-list-items-table">
                  <div className="blog-posts-list-items-table-header">
                    <div className="blog-posts-list-items-table-header-item title">
                      <span>Title</span>
                    </div>
                    <div className="blog-posts-list-items-table-header-item date">
                      <span>Date</span>
                    </div>
                    <div className="blog-posts-list-items-table-header-item edit">
                      <span></span>
                    </div>
                  </div>
                  {activePostsShown && activePosts.length
                    ? activePosts.map((post, index) => {
                        return (
                          <div
                            key={index}
                            className="blog-posts-list-items-table-item"
                          >
                            <div className="blog-posts-list-items-table-item-data title">
                              <span>{post.title}</span>
                            </div>
                            <div className="blog-posts-list-items-table-item-data date">
                              <span>
                                {moment
                                  .unix(post.dateTimestamp)
                                  .format('MM/DD/YYYY')}
                              </span>
                            </div>
                            <div className="blog-posts-list-items-table-item-data edit">
                              <a href={`/blog/edit-post/${post.id}`}>
                                <span>Edit</span>
                              </a>
                              <span>{' >'}</span>
                            </div>
                          </div>
                        );
                      })
                    : null}
                  {upcomingPostsShown && upcomingPosts.length
                    ? upcomingPosts.map((post, index) => {
                        return (
                          <div
                            key={index}
                            className="blog-posts-list-items-table-item"
                          >
                            <div className="blog-posts-list-items-table-item-data title">
                              <span>{post.title}</span>
                            </div>
                            <div className="blog-posts-list-items-table-item-data date">
                              <span>
                                {moment
                                  .unix(post.dateTimestamp)
                                  .format('MM/DD/YYYY')}
                              </span>
                            </div>
                            <div className="blog-posts-list-items-table-item-data edit">
                              <a href={`/blog/edit-post/${post.id}`}>
                                <span>Edit</span>
                              </a>
                              <span>{' >'}</span>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </>
            ) : (
              <div className="blog-posts-list-get-data-error">
                <span>An error occurred.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const apiResult = await getAllPosts(req);

  if (!apiResult.authSuccess) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }

  return {
    props: {
      activePosts: (apiResult.activePosts && apiResult.activePosts) || [],
      upcomingPosts: (apiResult.upcomingPosts && apiResult.upcomingPosts) || [],
      getDataError: (apiResult && apiResult.getDataError) || null,
    },
  };
}
