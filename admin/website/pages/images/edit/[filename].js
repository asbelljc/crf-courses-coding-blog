import { useState } from 'react';

import Head from 'next/head';

import Header from '../../../components/header.js';
import Sidebar from '../../../components/sidebar.js';
import DeleteImageModal from '../../../components/modals/deleteImage.js';

import getImageByFilename from '../../../api/images/getImageByFilename.js';
import updateImageFilename from '../../../api/images/updateImageFilename.js';
import checkIfImageFilenameExists from '../../../api/images/checkIfImageFilenameExists.js';
import deleteImage from '../../../api/images/deleteImage.js';

export default function EditImage({
  filename,
  fileSize,
  fileCreated,
  notFoundError,
}) {
  // update filename
  const [filenameInputValue, setFilenameInputValue] = useState(filename);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdateSubmissionError, setIsUpdateSubmissionError] = useState(false);
  const [filenameExistsError, setFilenameExistsError] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  // delete image
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [deletionError, setDeletionError] = useState(false);

  const updateFilenameInputValue = (e) => {
    setFilenameInputValue(e.target.value);
  };

  const requestUpdate = () => {
    if (!filenameInputValue) {
      setIsUpdateSubmissionError(true);
      setIsUpdateSuccess(false);
    } else {
      setIsUpdateLoading(true);
      setIsUpdateSuccess(false);

      checkIfImageFilenameExists(filenameInputValue, function (existsResponse) {
        if (!existsResponse.success) {
          setIsUpdateSubmissionError(false);
          setFilenameExistsError(true);
          setIsUpdateSuccess(false);
          setIsUpdateLoading(false);
        } else {
          updateImageFilename(
            filename,
            filenameInputValue,
            function (response) {
              if (response.submitError) {
                setIsUpdateSubmissionError(true);
                setFilenameExistsError(false);
                setIsUpdateSuccess(false);
                setIsUpdateLoading(false);
              } else if (!response.authSuccess) {
                window.location.href = '/login';
              } else if (!response.success) {
                setIsUpdateSubmissionError(true);
                setFilenameExistsError(false);
                setIsUpdateSuccess(false);
                setIsUpdateLoading(false);
              } else {
                setIsUpdateLoading(false);
                window.location.href = `/images/edit/${filenameInputValue}`;
              }
            }
          );
        }
      });
    }
  };

  const hideDeleteModal = () => {
    setDeleteModalShown(false);
    setDeletionLoading(false);
    setDeletionError(false);
  };

  const showDeleteModal = () => {
    setDeleteModalShown(true);
  };

  const requestDeletion = () => {
    setDeletionLoading(true);
    setDeletionError(false);

    deleteImage(filename, function (response) {
      if (response.submitError) {
        setDeletionLoading(false);
        setDeletionError(true);
      } else if (!response.authSuccess) {
        window.location.href = '/login';
      } else if (!response.success) {
        setDeletionLoading(false);
        setDeletionError(true);
      } else {
        window.location.href = '/images';
      }
    });
  };

  return (
    <div className="layout-wrapper">
      <Header />
      <Sidebar page="images" />
      <div className="layout-content-container">
        {!notFoundError ? (
          <div className="images-edit-content">
            <div className="images-edit-header">
              <span>Image Details</span>
            </div>
            <div className="images-edit-metadata-container">
              <div className="images-edit-metadata-title">
                <span>Metadata</span>
              </div>
              <div className="images-edit-metadata-items">
                <div className="images-edit-metadata-item">
                  <div className="images-edit-metadata-item-label">
                    <span>Filename:</span>
                  </div>
                  <div className="images-edit-metadata-item-data">
                    <span>{filename}</span>
                  </div>
                </div>
                <div className="images-edit-metadata-item">
                  <div className="images-edit-metadata-item-label">
                    <span>File size:</span>
                  </div>
                  <div className="images-edit-metadata-item-data">
                    <span>{fileSize}</span>
                  </div>
                </div>
                <div className="images-edit-metadata-item">
                  <div className="images-edit-metadata-item-label">
                    <span>Created:</span>
                  </div>
                  <div className="images-edit-metadata-item-data">
                    <span>{fileCreated}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="images-edit-form-container">
              <div className="images-edit-form-title">
                <span>Edit Filename</span>
              </div>
              <div className="images-edit-form-section">
                <div className="images-edit-form-section-label">
                  <span>Filename</span>
                </div>
                <div className="images-edit-form-section-input">
                  <input
                    type="text"
                    value={filenameInputValue}
                    onChange={updateFilenameInputValue}
                  />
                </div>
              </div>
              <div className="images-edit-page-submit-btn-section">
                <div className="images-edit-form-btn-container">
                  {!isUpdateLoading ? (
                    <div
                      onClick={requestUpdate}
                      className="images-edit-form-btn"
                    >
                      <span>Update</span>
                    </div>
                  ) : (
                    <div className="images-edit-form-btn loading">
                      <span>Loading</span>
                    </div>
                  )}
                </div>
                {isUpdateSubmissionError ? (
                  <div className="images-edit-submit-error-msg">
                    <span>An error occurred.</span>
                  </div>
                ) : null}
                {filenameExistsError ? (
                  <div className="images-edit-submit-error-msg">
                    <span>Filename already exists!</span>
                  </div>
                ) : null}
                {isUpdateSuccess ? (
                  <div className="images-edit-submit-success-msg">
                    <span>Success!</span>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="images-edit-delete-container">
              <div className="images-edit-delete-title">
                <span>Delete Image</span>
              </div>
              <div className="images-edit-delete-subtitle">
                <span>
                  This will remove the image from the server. Before deleting,
                  ensure this image is not being used anywhere.
                </span>
              </div>
              <div className="images-edit-delete-btn-container">
                <div
                  onClick={showDeleteModal}
                  className="images-edit-delete-btn"
                >
                  <span>Delete</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="images-edit-get-data-error-msg">
            <span>Image not found.</span>
          </div>
        )}
      </div>
      <DeleteImageModal
        error={deletionError}
        loading={deletionLoading}
        show={deleteModalShown}
        hideRequest={hideDeleteModal}
        deleteRequest={requestDeletion}
      />
    </div>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const apiResult = await getImageByFilename(query.filename, req);

  if (!apiResult.authSuccess) {
    res.writeHead(302, { Location: '/login' });
    res.end();
  }

  return {
    props: {
      notFoundError: (apiResult && apiResult.notFoundError) || null,
      fileSize: (apiResult && apiResult.fileSize) || null,
      fileCreated: (apiResult && apiResult.fileCreated) || null,
      filename: (apiResult && apiResult.filename) || null,
    },
  };
}
