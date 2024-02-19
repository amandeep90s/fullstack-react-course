const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: 3,
      required: true,
    },
    name: String,
    passwordHash: {
      type: String,
      required: true,
      minlength: 3,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // The password should not be revealed
    delete returnedObject.passwordHash;
  },
});

module.exports = User;
