const express = require('express');

const api = require('./api.js');

const { authAdminUser } = require('../../middlewares/index');

const router = express.Router();

router.get('/blog-posts/get-all', authAdminUser, function (req, res) {
  if (!res.locals.authSuccess) {
    res.json({ authSuccess: false });
  } else {
    api.getAllBlogPosts(function (apiResponse) {
      apiResponse.authSuccess = true;
      res.json(apiResponse);
    });
  }
});

router.post('/blog-posts/create-new', authAdminUser, function (req, res) {
  const {
    title,
    urlTitle,
    dateTimestamp,
    tags,
    thumbnailImageUrl,
    markdownContent,
    seoTitleTag,
    seoMetaDescription,
  } = req.body;

  if (
    !title ||
    !urlTitle ||
    !dateTimestamp ||
    !tags ||
    !thumbnailImageUrl ||
    !markdownContent ||
    !seoTitleTag ||
    !seoMetaDescription
  ) {
    res.json({ submitError: false });
  } else if (!res.locals.authSuccess) {
    res.json({ authSuccess: false });
  } else {
    api.createNewBlogPost(
      title,
      urlTitle,
      dateTimestamp,
      tags,
      thumbnailImageUrl,
      markdownContent,
      seoTitleTag,
      seoMetaDescription,
      function (apiResponse) {
        apiResponse.authSuccess = true;
        res.json(apiResponse);
      }
    );
  }
});

router.get('/blog-posts/get-post-by-id', authAdminUser, function (req, res) {
  if (!req.query.id) {
    res.json({ notFoundError: false });
  } else if (!res.locals.authSuccess) {
    res.json({ authSuccess: false });
  } else {
    api.getBlogPostById(req.query.id, function (apiResponse) {
      apiResponse.authSuccess = true;
      res.json(apiResponse);
    });
  }
});

router.put('/blog-posts/edit', authAdminUser, function (req, res) {
  const {
    id,
    title,
    urlTitle,
    dateTimestamp,
    tags,
    thumbnailImageUrl,
    markdownContent,
    seoTitleTag,
    seoMetaDescription,
  } = req.body;

  if (
    !id ||
    !title ||
    !urlTitle ||
    !dateTimestamp ||
    !tags ||
    !thumbnailImageUrl ||
    !markdownContent ||
    !seoTitleTag ||
    !seoMetaDescription
  ) {
    res.json({ submitError: false });
  } else if (!res.locals.authSuccess) {
    res.json({ authSuccess: false });
  } else {
    api.editBlogPost(
      id,
      title,
      urlTitle,
      dateTimestamp,
      tags,
      thumbnailImageUrl,
      markdownContent,
      seoTitleTag,
      seoMetaDescription,
      function (apiResponse) {
        apiResponse.authSuccess = true;
        res.json(apiResponse);
      }
    );
  }
});

router.put('/blog-posts/delete', authAdminUser, function (req, res) {
  if (!req.body.id) {
    res.json({ success: false });
  } else if (!res.locals.authSuccess) {
    res.json({ authSuccess: false });
  } else {
    api.deleteBlogPost(req.body.id, function (apiResponse) {
      apiResponse.authSuccess = true;
      res.json(apiResponse);
    });
  }
});

module.exports = router;
