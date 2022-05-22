import { useState } from 'react';

import Head from 'next/head';

import Header from '../../components/header.js';
import Sidebar from '../../components/sidebar.js';

import authUser from '../../api/admin-user/auth.js';

import checkIfImageFilenameExists from '../../api/images/checkIfImageFilenameExists.js';
import uploadImage from '../../api/images/uploadImage.js';

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

    let formData = new FormData();
    formData.append('selectedFile', selectedFile);

    if (!selectedFile) {
      setLoading(false);
      setSubmissionError(false);
      setFilenameExistsError(false);
      setNoFileError(true);
      setFilenameSpacesError(false);
      setSuccess(false);
    } else if (selectedFile.name.indexOf(' ') !== -1) {
      setLoading(false);
      setSubmissionError(false);
      setFilenameExistsError(false);
      setNoFileError(false);
      setFilenameSpacesError(true);
      setSuccess(false);
    } else {
      setLoading(true);
      setSubmissionError(false);
      setFilenameExistsError(false);
      setNoFileError(false);
      setFilenameSpacesError(false);
      setSuccess(false);

      checkIfImageFilenameExists(selectedFile.name, function (existsResponse) {
        if (!existsResponse.success) {
          setLoading(false);
          setSubmissionError(false);
          setFilenameExistsError(true);
          setNoFileError(false);
          setFilenameSpacesError(false);
          setSuccess(false);
        } else {
          uploadImage(formData, function (apiResponse) {
            if (apiResponse.submitError) {
              setLoading(false);
              setSubmissionError(true);
              setFilenameExistsError(false);
              setNoFileError(false);
              setFilenameSpacesError(false);
              setSuccess(false);
            } else if (!apiResponse.authSuccess) {
              window.location.href = '/login';
            } else if (apiResponse.noFileError) {
              setLoading(false);
              setSubmissionError(false);
              setFilenameExistsError(false);
              setNoFileError(true);
              setFilenameSpacesError(false);
              setSuccess(false);
            } else if (!apiResponse.success) {
              setLoading(false);
              setSubmissionError(true);
              setFilenameExistsError(false);
              setNoFileError(false);
              setFilenameSpacesError(false);
              setSuccess(false);
            } else {
              setLoading(false);
              setSubmissionError(false);
              setFilenameExistsError(false);
              setNoFileError(false);
              setFilenameSpacesError(false);
              setSuccess(true);
            }
          });
        }
      });
    }
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

export async function getServerSideProps({ req, res }) {
  const authResult = await authUser(req);

  if (!authResult.success) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }

  return { props: {} };
}
