const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an argument: node mongo.js <password>'
	);
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://amandeep90s:${password}@cluster0.sftmrf1.mongodb.net/noteApp?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
});

const Note = mongoose.model('Note', noteSchema);
mongoose.set('strictQuery', true);

mongoose
	.connect(url)
	.then(() => {
		console.log('connected');

		// const note = new Note({
		// 	content: 'Mongoose makes use of mongo easy',
		// 	date: new Date(),
		// 	important: false,
		// });

		// return note.save();

		Note.find({}).then((result) => {
			result.forEach((note) => {
				console.log(note);
			});
			mongoose.connection.close();
		});
	})
	// .then((data) => {
	// 	console.log('data', data);
	// 	console.log('note saved!');
	// 	return mongoose.connection.close();
	// })
	.catch((err) => console.log(err));
