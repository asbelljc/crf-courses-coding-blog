import axios from 'axios';

import apiBaseUrl from '../../utils/apiBaseUrl.js';

export default function (
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
    .post(
      `${apiBaseUrl}/blog-posts/create-new`,
      {
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
