import { useState } from 'react';

import Head from 'next/head';
import moment from 'moment';
import { Controlled as CodeMirror } from 'react-codemirror2';

import Header from '../../../components/header.js';
import Sidebar from '../../../components/sidebar.js';
import DeleteBlogPostModal from '../../../components/modals/deleteBlogPost.js';

if (typeof navigator !== 'undefined') {
  require('codemirror/mode/markdown/markdown');
}

export default function EditPost() {
  // NOTE: pretty sure we'll also need a 'submissionSuccess' state!
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [titleInputValue, setTitleInputValue] = useState('Blog Post Title');
  const [urlTitleInputValue, setUrlTitleInputValue] =
    useState('blog-post-title');
  const [dateInputValue, setDateInputValue] = useState('2050-01-01T12:00');
  const [tagsInputValue, setTagsInputValue] = useState('html, css, javascript');
  const [imageUrlInputValue, setImageUrlInputValue] = useState(
    'https://assets.coderrocketfuel.com/coding-blog-git-thumbnail.png'
  );
  const [markdownInputValue, setMarkdownInputValue] =
    useState('# Markdown content');
  const [seoTitleTagInputValue, setSeoTitleTagInputValue] = useState(
    'Blog Post Title | Coding Blog'
  );
  const [seoTitleTagCharLeft, setSeoTitleTagCharLeft] = useState(60);
  const [metaDescInputValue, setMetaDescInputValue] = useState(
    'The seo meta description for the blog post goes here.'
  );
  const [metaDescCharLeft, setMetaDescCharLeft] = useState(160);
  const [deletionError, setDeletionError] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [deleteModalShown, setDeleteModalShown] = useState(false);

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
    setDateInputValue(dateString + 'T' + timeString);
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

    setSeoTitleTagCharLeft(charLeft);
    setSeoTitleTagInputValue(e.target.value);
  };

  const updateMetaDescInputValue = (e) => {
    let charLeft;
    if (160 - e.target.value.length > 0) {
      charLeft = 160 - e.target.value.length;
    } else {
      charLeft = 0;
    }

    setMetaDescCharLeft(charLeft);
    setMetaDescInputValue(e.target.value);
  };

  const submitEditPostRequest = () => {
    setSubmissionLoading(true);
  };

  const showDeleteModalRequest = () => {
    setDeleteModalShown(true);
  };

  const hideDeleteModalRequest = () => {
    setDeletionError(false);
    setDeletionLoading(false);
    setDeleteModalShown(false);
  };

  const deleteBlogPostRequest = () => {
    setDeletionLoading(true);
  };

  return (
    <div className="layout-wrapper">
      <Head>
        <title>Edit Post | Admin</title>
      </Head>
      <Header />
      <Sidebar page="blog-posts" />
      <div className="layout-content-container">
        <div className="edit-blog-post-content">
          <div className="edit-blog-post-header">
            <span>Edit Blog Post</span>
          </div>
          <div className="edit-blog-post-form-container">
            <div className="edit-blog-post-form-section">
              <div className="edit-blog-post-form-section-label">
                <span>Title</span>
              </div>
              <div className="edit-blog-post-form-section-input">
                <input
                  type="text"
                  value={titleInputValue}
                  onChange={updateTitleInputValue}
                />
              </div>
            </div>
            <div className="edit-blog-post-form-section">
              <div className="edit-blog-post-form-section-label">
                <span>Url Title</span>
              </div>
              <div className="edit-blog-post-form-section-input">
                <input
                  type="text"
                  value={urlTitleInputValue}
                  onChange={updateUrlTitleInputValue}
                />
              </div>
            </div>
            <div className="edit-blog-post-form-section">
              <div className="edit-blog-post-form-section-label">
                <span>Date</span>
              </div>
              <div className="edit-blog-post-form-section-input">
                <input
                  type="datetime-local"
                  value={dateInputValue}
                  onChange={updateDateInputValue}
                />
                <span
                  onClick={setDateInputValueToNow}
                  className="edit-blog-post-form-section-date-input-now"
                >
                  Now
                </span>
              </div>
            </div>
            <div className="edit-blog-post-form-section">
              <div className="edit-blog-post-form-section-label">
                <span>Image URL</span>
              </div>
              <div className="edit-blog-post-form-section-input">
                <input
                  type="text"
                  value={imageUrlInputValue}
                  onChange={updateImageUrlInputValue}
                />
              </div>
            </div>
            <div className="edit-blog-post-form-section">
              <div className="edit-blog-post-form-section-label">
                <span>Tags</span>
              </div>
              <div className="edit-blog-post-form-section-input">
                <input
                  type="text"
                  value={tagsInputValue}
                  onChange={updateTagsInputValue}
                />
              </div>
            </div>
            <div className="edit-blog-post-form-section">
              <div className="edit-blog-post-form-section-label">
                <span>Markdown Content</span>
              </div>
              <div className="edit-blog-post-form-section-code-content-input">
                {CodeMirror && (
                  <CodeMirror
                    className="edit-blog-post-form-section-codemirror"
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
            <div className="edit-blog-post-seo-section-title">
              <span>SEO</span>
            </div>
            <div className="edit-blog-post-form-section">
              <div className="edit-blog-post-form-section-label">
                <span>Title Tag</span>
              </div>
              <div className="edit-blog-post-form-section-input">
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
            <div className="edit-blog-post-form-section">
              <div className="edit-blog-post-form-section-label">
                <span>Meta Description</span>
              </div>
              <div className="edit-blog-post-form-section-input">
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
            <div className="edit-blog-post-form-btns-section">
              <div className="edit-blog-post-form-submit-btn-container">
                {!submissionLoading ? (
                  <div
                    onClick={submitEditPostRequest}
                    className="edit-blog-post-form-btn"
                  >
                    <span>Submit</span>
                  </div>
                ) : (
                  <div className="edit-blog-post-form-btn loading">
                    <span>Loading</span>
                  </div>
                )}
              </div>
              <div
                onClick={showDeleteModalRequest}
                className="edit-blog-post-form-delete"
              >
                <span>Delete</span>
              </div>
            </div>
            {submissionError ? (
              <div className="edit-blog-post-submit-error-msg">
                <span>{errorMsg}</span>
              </div>
            ) : null}
            {submissionSuccess ? (
              <div className="edit-blog-post-submit-success-msg">
                <span>Success!</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <DeleteBlogPostModal
        error={deletionError}
        loading={deletionLoading}
        show={deleteModalShown}
        hideRequest={hideDeleteModalRequest}
        deleteBlogPostRequest={deleteBlogPostRequest}
      />
    </div>
  );
}
