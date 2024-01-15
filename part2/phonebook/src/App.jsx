import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filter, setFilter] = useState("");

	useEffect(() => {
		personService.getAll().then((initialPersons) => setPersons(initialPersons));
	}, []);

	const handleNewName = (e) => setNewName(e.target.value);

	const handleNewPhone = (e) => setNewPhone(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (newName) {
			const isNameExist = persons.find(
				(person) => newName.toLowerCase().trim() === person.name.toLowerCase()
			);

			const newPersonObject = {
				name: newName.trim(),
				phone: newPhone.trim(),
			};

			if (
				isNameExist &&
				confirm(
					`${isNameExist.name} is already added to phonebook, replace the old number with a new one?`
				)
			) {
				personService
					.update(isNameExist.id, newPersonObject)
					.then((returnedPerson) => {
						const newPersons = persons.map((person) =>
							person.id === isNameExist.id ? returnedPerson : person
						);
						setPersons(newPersons);
						setNewName("");
						setNewPhone("");
					});
			} else {
				personService.create(newPersonObject).then((returnedPerson) => {
					setPersons(persons.concat(returnedPerson));
					setNewName("");
					setNewPhone("");
				});
			}
		}
	};

	const handleDelete = (id) => {
		const person = persons.find((person) => person.id === id);
		if (confirm(`Delete ${person.name} ?`)) {
			personService.destroy(person.id).then(() => {
				setPersons(persons.filter((person) => person.id !== id));
			});
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
			<Persons personsToShow={personsToShow} handleDelete={handleDelete} />
		</div>
	);
};

export default App;
