const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/phonebookApp";

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 2) {
	Person.find({}).then((result) => {
		console.log("phonebook:");
		result.forEach((person) => {
			console.log(person.name, person.number);
		});
		mongoose.connection.close();
	});
} else if (process.argv.length === 4) {
	const person = new Person({
		name: process.argv[2],
		number: process.argv[3],
	});

	person.save().then((result) => {
		console.log(
			`added ${process.argv[2]}, number ${process.argv[3]} to phonebook`
		);
		mongoose.connection.close();
	});
}
