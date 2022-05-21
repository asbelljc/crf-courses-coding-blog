import { useState } from 'react';

import Head from 'next/head';

import Header from '../../components/header.js';
import Sidebar from '../../components/sidebar.js';

export default function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);
  const [noFileError, setNoFileError] = useState(false);
  const [filenameExistsError, setFilenameExistsError] = useState(false);
  const [filenameSpacesError, setFilenameSpacesError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const requestImageUpload = (e) => {
    e.preventDefault();

    // api request goes here
  };

  return (
    <div className="layout-wrapper">
      <Head>
        <title>Upload Image | Admin</title>
      </Head>
      <Header />
      <Sidebar page="images" />
      <div className="layout-content-container">
        <div className="images-upload-content">
          <div className="images-upload-header">
            <span>Upload Image</span>
          </div>
          <div className="images-upload-form-container">
            <form onSubmit={requestImageUpload}>
              <div className="images-upload-form-label">
                <span>Choose a file:</span>
              </div>
              <input
                type="file"
                name="selectedFile"
                onChange={handleInputChange}
              />
              <div className="images-upload-form-submit-btn-container">
                {!loading ? (
                  <button
                    className="images-upload-form-submit-btn"
                    type="submit"
                  >
                    Submit
                  </button>
                ) : (
                  <button className="images-upload-form-submit-btn loading">
                    Loading
                  </button>
                )}
              </div>
            </form>
          </div>
          {success ? (
            <div className="images-upload-success-msg">
              <span>Success!</span>
            </div>
          ) : null}
          {submissionError ? (
            <div className="images-upload-error-msg">
              <span>An error occurred.</span>
            </div>
          ) : null}
          {filenameExistsError ? (
            <div className="images-upload-error-msg">
              <span>Filename already exists.</span>
            </div>
          ) : null}
          {filenameSpacesError ? (
            <div className="images-upload-error-msg">
              <span>
                Spaces need to be removed from the filename before uploading.
              </span>
            </div>
          ) : null}
          {noFileError ? (
            <div className="images-upload-error-msg">
              <span>No file was detected.</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
