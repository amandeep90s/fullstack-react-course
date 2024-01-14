import { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filter, setFilter] = useState("");

	const handleNewName = (e) => setNewName(e.target.value);

	const handleNewPhone = (e) => setNewPhone(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (newName) {
			const isNameExist = persons.find(
				(person) => newName.trim() === person.name
			);

			if (isNameExist) {
				alert(`${newName} is already added to phonebook`);
				return;
			}
			const newPersonObject = { name: newName.trim(), phone: newPhone.trim() };

			setPersons(persons.concat(newPersonObject));
			setNewName("");
			setNewPhone("");
		}
	};

	const byFilterField = (p) =>
		p.name.toLowerCase().includes(filter.toLowerCase());

	const personsToShow = filter ? persons.filter(byFilterField) : persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				Filter shown with:
				<input
					type="text"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
			<h2>Add a new </h2>
			<form onSubmit={handleSubmit}>
				<div>
					name: <input type="text" value={newName} onChange={handleNewName} />
				</div>
				<div>
					phone:
					<input type="text" value={newPhone} onChange={handleNewPhone} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>

			<h2>Numbers</h2>
			{personsToShow.map((person, index) => (
				<p key={person.name + index}>
					{person.name} : {person.phone}
				</p>
			))}
		</div>
	);
};

export default App;
