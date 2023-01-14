const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			minLength: 3,
			required: [true, 'Username field must required'],
		},
		name: {
			type: String,
			minLength: 3,
			required: [true, 'Name field must required'],
		},
		passwordHash: {
			type: String,
			minLength: 3,
			requried: [true, 'Password field must required'],
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

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__V;
		delete returnedObject.passwordHash;
	},
});

module.exports = mongoose.model('User', userSchema);
