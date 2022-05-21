const express = require('express');

const api = require('./api');

const router = express.Router();

router.get('/posts/get-all-blog-posts', function (req, res) {
  api.getAllBlogPosts(function (apiResponse) {
    res.json(apiResponse);
  });
});

router.get('/posts/get-blog-posts-by-tag', function (req, res) {
  api.getBlogPostsByTag(req.query.tag, function (apiResponse) {
    res.json(apiResponse);
  });
});

router.get('/posts/get-five-newest-posts', function (req, res) {
  api.getFiveNewestPosts(function (apiResponse) {
    res.json(apiResponse);
  });
});

router.get('/posts/get-blog-post-by-url-title', function (req, res) {
  api.getBlogPostByUrlTitle(req.query.urlTitle, function (apiResponse) {
    res.json(apiResponse);
  });
});

module.exports = router;
