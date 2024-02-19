const Yup = require('yup');

const userSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 6 characters')
    .max(28, 'Username must not be nore then 28 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Username must be at least 6 characters'),
});

module.exports = userSchema;
