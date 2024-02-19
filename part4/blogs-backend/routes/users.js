const express = require('express');
const usersController = require('../controllers/users');
const middleware = require('../utils/middleware');
const userSchema = require('../validations/user');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.post(
  '/',
  middleware.validateData(userSchema),
  usersController.createUser
);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
