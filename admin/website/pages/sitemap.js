import { useState } from 'react';

import Head from 'next/head';

import Header from '../components/header.js';
import Sidebar from '../components/sidebar.js';

export default function Sitemap() {
  // update sitemap
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdateError, setIsUpdateError] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  // restart pm2
  const [pm2RestartLoading, setPm2RestartLoading] = useState(false);
  const [pm2RestartError, setPm2RestartError] = useState(false);
  const [pm2RestartSuccess, setPm2RestartSuccess] = useState(false);
  // send ping to search engines
  const [isPingLoading, setIsPingLoading] = useState(false);
  const [isPingError, setIsPingError] = useState(false);
  const [isPingSuccess, setIsPingSuccess] = useState(false);

  const requestSitemapUpdate = () => {
    setIsUpdateLoading(true);
    setIsUpdateError(false);
    setIsUpdateSuccess(false);

    // call update sitemap function
  };

  const requestPm2Restart = () => {
    setPm2RestartLoading(true);
    setPm2RestartError(false);
    setPm2RestartSuccess(false);

    // call restart PM2 function
  };

  const requestSearchEnginesPing = () => {
    setIsPingLoading(true);
    setIsPingError(false);
    setIsPingSuccess(false);

    // call ping search engines function
  };

  return (
    <div className="layout-wrapper">
      <Head>
        <title>Sitemap | Admin</title>
      </Head>
      <Header />
      <Sidebar page="sitemap" />
      <div className="layout-content-container">
        <div className="sitemap-content">
          <div className="sitemap-header">
            <span>Manage Sitemap</span>
          </div>
          <div className="sitemap-form-container">
            <div className="sitemap-form-section">
              <div className="sitemap-form-title">
                <span>Update Sitemap XML File</span>
              </div>
              <div className="sitemap-form-description">
                <span>
                  This will write new content to the sitemap.xml file hosted by
                  the fronted website.
                </span>
              </div>
              <div className="sitemap-form-btn-container">
                {!isUpdateLoading ? (
                  <div
                    onClick={requestSitemapUpdate}
                    className="sitemap-form-btn"
                  >
                    <span>Update Sitemap</span>
                  </div>
                ) : (
                  <div className="sitemap-form-btn loading">
                    <span>Loading</span>
                  </div>
                )}
              </div>
              {isUpdateSuccess ? (
                <div className="sitemap-success-msg">
                  <span>Success!</span>
                </div>
              ) : null}
              {isUpdateError ? (
                <div className="sitemap-error-msg">
                  <span>An error occurred.</span>
                </div>
              ) : null}
            </div>
            <div className="sitemap-form-section">
              <div className="sitemap-form-title">
                <span>Restart Frontend Website PM2 Process</span>
              </div>
              <div className="sitemap-form-description">
                <span>
                  This will make any sitemap updates live in production by
                  restarting the PM2 process.
                </span>
              </div>
              <div className="sitemap-form-btn-container">
                {!pm2RestartLoading ? (
                  <div onClick={requestPm2Restart} className="sitemap-form-btn">
                    <span>Restart PM2</span>
                  </div>
                ) : (
                  <div className="sitemap-form-btn loading">
                    <span>Loading</span>
                  </div>
                )}
              </div>
              {pm2RestartSuccess ? (
                <div className="sitemap-success-msg">
                  <span>Success!</span>
                </div>
              ) : null}
              {pm2RestartError ? (
                <div className="sitemap-error-msg">
                  <span>An error occurred.</span>
                </div>
              ) : null}
            </div>
            <div className="sitemap-form-section">
              <div className="sitemap-form-title">
                <span>Ping Search Engines</span>
              </div>
              <div className="sitemap-form-description">
                <span>
                  This will ping Google and Bing to let them know updates to the
                  sitemap have been made.
                </span>
              </div>
              <div className="sitemap-form-btn-container">
                {!isPingLoading ? (
                  <div
                    onClick={requestSearchEnginesPing}
                    className="sitemap-form-btn"
                  >
                    <span>Send Ping</span>
                  </div>
                ) : (
                  <div className="sitemap-form-btn loading">
                    <span>Loading</span>
                  </div>
                )}
              </div>
              {isPingSuccess ? (
                <div className="sitemap-success-msg">
                  <span>Success!</span>
                </div>
              ) : null}
              {isPingError ? (
                <div className="sitemap-error-msg">
                  <span>An error occurred.</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
