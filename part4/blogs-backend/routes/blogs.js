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
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
