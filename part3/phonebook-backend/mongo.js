const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an argument: node mongo.js <password>'
	);
	process.exit(1);
}

const password = process.argv[2];

const name = process.argv[3] || null;
const number = process.argv[4] || null;

const url = `mongodb+srv://amandeep90s:${password}@cluster0.sftmrf1.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model('Person', personSchema);
mongoose.set('strictQuery', true);

mongoose
	.connect(url)
	.then(() => {
		console.log('connected');
		if (name === null || number === null) {
			Person.find({}).then((data) => {
				data.forEach((person) => {
					console.log(`${person.name} ${person.number}`);
				});
				mongoose.connection.close();
			});
		} else {
			const person = new Person({
				name,
				number,
				date: new Date(),
			});

			person.save();
			console.log('person saved');
			return mongoose.connection.close();
		}
	})
	.catch((err) => console.log(err));
