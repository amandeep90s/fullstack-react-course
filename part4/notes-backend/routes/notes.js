const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const notesController = require('../controllers/notes');

const router = express.Router();

router.get('/', notesController.getNotes);
router.get('/:id', notesController.getNote);
router.post(
  '/',
  jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),
  notesController.createNote
);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;
