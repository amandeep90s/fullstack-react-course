const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'Title must be required'],
			minLength: 5,
		},
		author: {
			type: String,
			required: [true, 'Author must be required'],
			minLength: 3,
		},
		url: {
			type: String,
			required: [true, 'Url must be required'],
		},
		likes: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

blogsSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id;
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Blog', blogsSchema);
