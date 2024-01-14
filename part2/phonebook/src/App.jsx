import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Amandeep Singh" }]);
	const [newName, setNewName] = useState("");

	const handleNewName = (e) => setNewName(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (newName) {
			const newNameObject = { name: newName };

			setPersons(persons.concat(newNameObject));
			setNewName("");
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input type="text" value={newName} onChange={handleNewName} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<h2>Numbers</h2>
			{persons.map((person, index) => (
				<p key={person.name + index}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
