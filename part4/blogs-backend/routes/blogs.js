const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const blogController = require('../controllers/blogs');
const config = require('../utils/config');
const middleware = require('../utils/middleware');

const router = express.Router();

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);
router.post(
  '/',
  jwt(config.JWT_TOKEN_AUTH),
  middleware.userExtractor,
  blogController.createBlog
);
router.put(
  '/:id',
  jwt(config.JWT_TOKEN_AUTH),
  middleware.userExtractor,
  blogController.updateBlog
);
router.delete(
  '/:id',
  jwt(config.JWT_TOKEN_AUTH),
  middleware.userExtractor,
  blogController.deleteBlog
);

module.exports = router;
