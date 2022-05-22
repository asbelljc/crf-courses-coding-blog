import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl.js';

export default function (
  id,
  title,
  urlTitle,
  dateTimestamp,
  tags,
  thumbnailImageUrl,
  markdownContent,
  seoTitleTag,
  seoMetaDescription,
  callback
) {
  axios
    .put(
      `${apiBaseUrl}/blog-posts/edit`,
      {
        id,
        title,
        urlTitle,
        dateTimestamp,
        tags,
        thumbnailImageUrl,
        markdownContent,
        seoTitleTag,
        seoMetaDescription,
      },
      {
        withCredentials: true,
      }
    )
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      callback({ submitError: true });
    });
}
