import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

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
			<Filter filter={filter} setFilter={setFilter} />

			<h2>Add a new </h2>
			<PersonForm
				handleSubmit={handleSubmit}
				handleNewName={handleNewName}
				handleNewPhone={handleNewPhone}
				newName={newName}
				newPhone={newPhone}
			/>

			<h2>Numbers</h2>
			<Persons personsToShow={personsToShow} />
		</div>
	);
};

export default App;
