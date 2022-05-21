import { useState } from 'react';

import Head from 'next/head';

import Header from '../../../components/header.js';
import Sidebar from '../../../components/sidebar.js';
import DeleteImageModal from '../../../components/modals/deleteImage.js';

export default function EditImage({ filename }) {
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
    setIsUpdateLoading(true);
    setIsUpdateSuccess(false);
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
  };

  return (
    <div className="layout-wrapper">
      <Header />
      <Sidebar page="images" />
      <div className="layout-content-container">
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
                  <span>filename.png</span>
                </div>
              </div>
              <div className="images-edit-metadata-item">
                <div className="images-edit-metadata-item-label">
                  <span>File size:</span>
                </div>
                <div className="images-edit-metadata-item-data">
                  <span>12 mb</span>
                </div>
              </div>
              <div className="images-edit-metadata-item">
                <div className="images-edit-metadata-item-label">
                  <span>Created:</span>
                </div>
                <div className="images-edit-metadata-item-data">
                  <span>12/05/2050</span>
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
                  <div onClick={requestUpdate} className="images-edit-form-btn">
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
              <div onClick={showDeleteModal} className="images-edit-delete-btn">
                <span>Delete</span>
              </div>
            </div>
          </div>
        </div>
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
