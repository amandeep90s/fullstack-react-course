import React, { useEffect, useState } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [oldPersons, setOldPersons] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [errorType, setErrorType] = useState(null);

	const hook = () => {
		personService.getAll().then((returnedPersons) => {
			setPersons(returnedPersons);
			setOldPersons(returnedPersons);
		});
	};

	useEffect(hook, []);

	const handleDeletePerson = (id) => {
		personService
			.deletePerson(id)
			.then((response) => {
				if (response.status === 204) {
					const newPersons = persons.filter((person) => person.id !== id);
					setPersons(newPersons);
					setOldPersons(newPersons);
				}
			})
			.catch((error) => {
				setErrorMessage('Information has already been removed from server');
				setErrorType('error');

				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={errorMessage} type={errorType} />
			<Filter
				persons={persons}
				setPersons={setPersons}
				initialData={oldPersons}
			/>
			<h2>add a new number</h2>
			<PersonForm
				persons={persons}
				setPersons={setPersons}
				setOldPersons={setOldPersons}
				setErrorMessage={setErrorMessage}
				setErrorType={setErrorType}
			/>
			<h2>Numbers</h2>
			<Persons persons={persons} handleDeletePerson={handleDeletePerson} />
		</div>
	);
};

export default App;
