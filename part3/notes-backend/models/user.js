const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: [true, 'Username must required'],
		},
		name: {
			type: String,
			required: [true, 'Name field must required'],
		},
		passwordHash: {
			type: String,
			minLength: 8,
			required: [true, 'Password field must required'],
		},
		notes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Note',
			},
		],
	},
	{ timestamps: true }
);

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash;
	},
});

module.exports = mongoose.model('User', userSchema);
