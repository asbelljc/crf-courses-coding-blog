import { useState } from 'react';
import Head from 'next/head';
import moment from 'moment';
import { Controlled as CodeMirror } from 'react-codemirror2';

import Header from '../../components/header.js';
import Sidebar from '../../components/sidebar.js';

import authUser from '../../api/admin-user/auth.js';
import createNewPost from '../../api/blog-posts/createNewPost.js';

if (typeof navigator !== 'undefined') {
  require('codemirror/mode/markdown/markdown');
}

export default function CreateNewPost() {
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [titleInputValue, setTitleInputValue] = useState('');
  const [urlTitleInputValue, setUrlTitleInputValue] = useState('');
  const [dateInputValue, setDateInputValue] = useState('');
  const [tagsInputValue, setTagsInputValue] = useState('');
  const [imageUrlInputValue, setImageUrlInputValue] = useState('');
  const [markdownInputValue, setMarkdownInputValue] = useState('');
  const [seoTitleTagInputValue, setSeoTitleTagInputValue] = useState('');
  const [seoTitleTagCharLeft, setSeoTitleTagCharLeft] = useState(60);
  const [metaDescInputValue, setMetaDescInputValue] = useState('');
  const [metaDescCharLeft, setMetaDescCharLeft] = useState(160);
  // not sure about this syntax...
  let codemirror = null;

  const updateTitleInputValue = (e) => {
    setTitleInputValue(e.target.value);
  };

  const updateUrlTitleInputValue = (e) => {
    setUrlTitleInputValue(e.target.value);
  };

  const updateDateInputValue = (e) => {
    setDateInputValue(e.target.value);
  };

  const setDateInputValueToNow = () => {
    const dateString = moment().format('YYYY-MM-DD');
    const timeString = moment().format('HH:mm');

    setDateInputValue(`${dateString}T${timeString}`);
  };

  const updateImageUrlInputValue = (e) => {
    setImageUrlInputValue(e.target.value);
  };

  const updateTagsInputValue = (e) => {
    setTagsInputValue(e.target.value);
  };

  const updateMarkdownInputValue = (value) => {
    setMarkdownInputValue(value);
  };

  const updateSeoTitleTagInputValue = (e) => {
    let charLeft;

    if (60 - e.target.value.length > 0) {
      charLeft = 60 - e.target.value.length;
    } else {
      charLeft = 0;
    }

    setSeoTitleTagInputValue(e.target.value);
    setSeoTitleTagCharLeft(charLeft);
  };

  const updateMetaDescInputValue = (e) => {
    let charLeft;

    if (160 - e.target.value.length > 0) {
      charLeft = 160 - e.target.value.length;
    } else {
      charLeft = 0;
    }

    setMetaDescInputValue(e.target.value);
    setMetaDescCharLeft(charLeft);
  };

  const requestCreateNewPostSubmission = () => {
    if (!titleInputValue) {
      setSubmissionError(true);
      setErrorMsg('Title field is required.');
    } else if (!urlTitleInputValue) {
      setSubmissionError(true);
      setErrorMsg('URL title field is required.');
    } else if (!dateInputValue) {
      setSubmissionError(true);
      setErrorMsg('Date field is required.');
    } else if (!tagsInputValue) {
      setSubmissionError(true);
      setErrorMsg('Tags field is required.');
    } else if (!imageUrlInputValue) {
      setSubmissionError(true);
      setErrorMsg('Image URL field is required.');
    } else if (!markdownInputValue) {
      setSubmissionError(true);
      setErrorMsg('Markdown content field is required.');
    } else if (!seoTitleTagInputValue) {
      setSubmissionError(true);
      setErrorMsg('SEO title field is required.');
    } else if (!metaDescInputValue) {
      setSubmissionError(true);
      setErrorMsg('Meta description field is required.');
    } else {
      setSubmissionError(false);
      setErrorMsg('');
      setLoading(true);

      createNewPost(
        titleInputValue,
        urlTitleInputValue,
        moment(dateInputValue).valueOf() / 1000,
        tagsInputValue,
        imageUrlInputValue,
        markdownInputValue,
        seoTitleTagInputValue,
        metaDescInputValue,
        function (apiResponse) {
          if (!apiResponse.authSuccess) {
            window.location.href = '/login';
          } else if (apiResponse.alreadyExistsError) {
            setSubmissionError(true);
            setErrorMsg('Blog post with that title already exists.');
            setLoading(false);
          } else if (apiResponse.submissionError || !apiResponse.success) {
            setSubmissionError(true);
            setErrorMsg('An error occurred.');
            setLoading(false);
          } else {
            window.location.href = '/';
          }
        }
      );
    }
  };

  return (
    <div className="layout-wrapper">
      <Head>
        <title>Create New Post | Admin</title>
      </Head>
      <Header />
      <Sidebar page="blog-posts" />
      <div className="layout-content-container">
        <div className="create-blog-post-content">
          <div className="create-blog-post-header">
            <span>Create New Blog Post</span>
          </div>
          <div className="create-blog-post-form-container">
            <div className="create-blog-post-form-section">
              <div className="create-blog-post-form-section-label">
                <span>Title</span>
              </div>
              <div className="create-blog-post-form-section-input">
                <input
                  type="text"
                  value={titleInputValue}
                  onChange={updateTitleInputValue}
                />
              </div>
            </div>
            <div className="create-blog-post-form-section">
              <div className="create-blog-post-form-section-label">
                <span>Url Title</span>
              </div>
              <div className="create-blog-post-form-section-input">
                <input
                  type="text"
                  value={urlTitleInputValue}
                  onChange={updateUrlTitleInputValue}
                />
              </div>
            </div>
            <div className="create-blog-post-form-section">
              <div className="create-blog-post-form-section-label">
                <span>Date</span>
              </div>
              <div className="create-blog-post-form-section-date-input">
                <input
                  type="datetime-local"
                  value={dateInputValue}
                  onChange={updateDateInputValue}
                />
                <span
                  onClick={setDateInputValueToNow}
                  className="create-blog-post-form-section-date-input-now"
                >
                  Now
                </span>
              </div>
            </div>
            <div className="create-blog-post-form-section">
              <div className="create-blog-post-form-section-label">
                <span>Image URL</span>
              </div>
              <div className="create-blog-post-form-section-input">
                <input
                  type="text"
                  value={imageUrlInputValue}
                  onChange={updateImageUrlInputValue}
                />
              </div>
            </div>
            <div className="create-blog-post-form-section">
              <div className="create-blog-post-form-section-label">
                <span>Tags</span>
              </div>
              <div className="create-blog-post-form-section-input">
                <input
                  type="text"
                  value={tagsInputValue}
                  onChange={updateTagsInputValue}
                />
              </div>
            </div>
            <div className="create-blog-post-form-section">
              <div className="create-blog-post-form-section-label">
                <span>Markdown Content</span>
              </div>
              <div className="create-blog-post-form-section-code-content-input">
                {CodeMirror && (
                  <CodeMirror
                    className="create-blog-post-form-section-codemirror"
                    editorDidMount={(editor) => {
                      codemirror = editor;
                    }}
                    value={markdownInputValue}
                    onBeforeChange={(editor, data, value) => {
                      updateMarkdownInputValue(value);
                    }}
                    onChange={(editor, data, value) => {
                      updateMarkdownInputValue(value);
                    }}
                    options={{
                      mode: 'markdown',
                      theme: 'dracula',
                      lineNumbers: true,
                    }}
                  />
                )}
              </div>
            </div>
            <div className="create-blog-post-seo-section-title">
              <span>SEO</span>
            </div>
            <div className="create-blog-post-form-section">
              <div className="create-blog-post-form-section-label">
                <span>Title Tag</span>
              </div>
              <div className="create-blog-post-form-section-input">
                <input
                  type="text"
                  value={seoTitleTagInputValue}
                  onChange={updateSeoTitleTagInputValue}
                />
                <span
                  className={
                    seoTitleTagCharLeft > 0
                      ? 'char-length green'
                      : 'char-length red'
                  }
                >
                  {seoTitleTagCharLeft}
                </span>
              </div>
            </div>
            <div className="create-blog-post-form-section">
              <div className="create-blog-post-form-section-label">
                <span>Meta Description</span>
              </div>
              <div className="create-blog-post-form-section-input">
                <textarea
                  type="text"
                  value={metaDescInputValue}
                  onChange={updateMetaDescInputValue}
                />
                <span
                  className={
                    metaDescCharLeft > 0
                      ? 'char-length green'
                      : 'char-length red'
                  }
                >
                  {metaDescCharLeft}
                </span>
              </div>
            </div>
            <div className="create-blog-post-form-btn-container">
              {!loading ? (
                <div
                  onClick={requestCreateNewPostSubmission}
                  className="create-blog-post-form-btn"
                >
                  <span>Submit</span>
                </div>
              ) : (
                <div className="create-blog-post-form-btn loading">
                  <span>Loading</span>
                </div>
              )}
            </div>
            {submissionError ? (
              <div className="create-blog-post-submit-error-msg">
                <span>{errorMsg}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  const authResult = await authUser(req);

  if (!authResult.success) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }

  return { props: {} };
}
