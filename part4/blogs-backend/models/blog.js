const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5,
    },
    author: {
      type: String,
      required: true,
      minLength: 3,
    },
    url: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

blogsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogsSchema);
