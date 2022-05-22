import { useState } from 'react';

import Head from 'next/head';
import moment from 'moment';
import { Controlled as CodeMirror } from 'react-codemirror2';

import Header from '../../../components/header.js';
import Sidebar from '../../../components/sidebar.js';
import DeleteBlogPostModal from '../../../components/modals/deleteBlogPost.js';

import getBlogPostById from '../../../api/blog-posts/getPostById.js';
import editBlogPost from '../../../api/blog-posts/editBlogPost.js';
import deleteBlogPost from '../../../api/blog-posts/deleteBlogPost.js';

if (typeof navigator !== 'undefined') {
  require('codemirror/mode/markdown/markdown');
}

export default function EditPost({ post, getDataError, notFoundError }) {
  // NOTE: pretty sure we'll also need a 'submissionSuccess' state!
  const [submissionLoading, setSubmissionLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [titleInputValue, setTitleInputValue] = useState(post && post.title);
  const [urlTitleInputValue, setUrlTitleInputValue] = useState(
    post && post.urlTitle
  );
  const [dateInputValue, setDateInputValue] = useState(
    post &&
      moment.unix(post.dateTimestamp).format('YYYY-MM-DD') +
        'T' +
        moment.unix(post.dateTimestamp).format('HH:mm')
  );
  const [tagsInputValue, setTagsInputValue] = useState(
    post && post.tags.join(', ')
  );
  const [imageUrlInputValue, setImageUrlInputValue] = useState(
    post && post.thumbnailImageUrl
  );
  const [markdownInputValue, setMarkdownInputValue] = useState(
    post && post.markdownContent
  );
  const [seoTitleTagInputValue, setSeoTitleTagInputValue] = useState(
    post && post.seoTitleTag
  );
  const [seoTitleTagCharLeft, setSeoTitleTagCharLeft] = useState(
    post && 60 - post.seoTitleTag.length
  );
  const [metaDescInputValue, setMetaDescInputValue] = useState(
    post && post.seoMetaDescription
  );
  const [metaDescCharLeft, setMetaDescCharLeft] = useState(
    post && 160 - post.seoMetaDescription.length
  );
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

  const showSuccessMsg = () => {
    setSubmissionSuccess(true);

    setTimeout(() => {
      setSubmissionSuccess(false);
    }, 5000);
  };

  const submitEditPostRequest = () => {
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
      setSubmissionSuccess(false);
      setSubmissionError(false);
      setErrorMsg('');
      setSubmissionLoading(true);

      editBlogPost(
        post.id,
        titleInputValue,
        urlTitleInputValue,
        moment(dateInputValue).valueOf() / 1000,
        tagsInputValue,
        imageUrlInputValue,
        markdownInputValue,
        seoTitleTagInputValue,
        metaDescInputValue,
        function (apiResponse) {
          if (apiResponse.submitError) {
            setSubmissionSuccess(false);
            setSubmissionError(true);
            setErrorMsg('An error occurred.');
            setSubmissionLoading(false);
          } else if (!apiResponse.authSuccess) {
            window.location.href = '/login';
          } else if (apiResponse.notFoundError) {
            setSubmissionSuccess(false);
            setSubmissionError(true);
            setErrorMsg('Blog post not found.');
            setSubmissionLoading(false);
          } else if (!apiResponse.success) {
            setSubmissionSuccess(false);
            setSubmissionError(true);
            setErrorMsg('An error occurred.');
            setSubmissionLoading(false);
          } else {
            setSubmissionError(false);
            setSubmissionLoading(false);
            showSuccessMsg();
          }
        }
      );
    }
  };

  const showDeleteModalRequest = () => {
    setDeleteModalShown(true);
  };

  const hideDeleteModalRequest = () => {
    setDeletionError(false);
    setDeletionLoading(false);
    setDeleteModalShown(false);
  };

  const requestBlogPostDeletion = () => {
    setDeletionLoading(true);

    deleteBlogPost(post.id, function (apiResponse) {
      if (apiResponse.submissionError) {
        setDeletionError(true);
        setDeletionLoading(false);
        setDeleteModalShown(false);
      } else if (!apiResponse.authSuccess) {
        window.location.href = '/login';
      } else if (!apiResponse.success) {
        setDeletionError(true);
        setDeletionLoading(false);
        setDeleteModalShown(false);
      } else {
        window.location.href = '/';
      }
    });
  };

  return (
    <div className="layout-wrapper">
      <Head>
        <title>Edit Post | Admin</title>
      </Head>
      <Header />
      <Sidebar page="blog-posts" />
      <div className="layout-content-container">
        {!getDataError && !notFoundError ? (
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
        ) : (
          <div className="edit-blog-post-get-data-error-msg">
            {getDataError ? (
              <span>An error occurred.</span>
            ) : (
              <span>Blog post not found.</span>
            )}
          </div>
        )}
      </div>
      <DeleteBlogPostModal
        error={deletionError}
        loading={deletionLoading}
        show={deleteModalShown}
        hideRequest={hideDeleteModalRequest}
        deleteBlogPostRequest={requestBlogPostDeletion}
      />
    </div>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const apiResult = await getBlogPostById(query.id, req);

  if (!apiResult.authSuccess) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }

  return {
    props: {
      post: (apiResult && apiResult.post) || null,
      getDataError: (apiResult && apiResult.getDataError) || null,
      notFoundError: (apiResult && apiResult.notFoundError) || null,
    },
  };
}
