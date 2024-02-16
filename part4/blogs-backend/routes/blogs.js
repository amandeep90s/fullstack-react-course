const express = require('express');
const blogController = require('../controllers/blogs');

const router = express.Router();

router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;
