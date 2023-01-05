import React, { useState } from 'react';
import personService from '../services/persons';

const PersonForm = ({
	persons,
	setPersons,
	setOldPersons,
	setErrorMessage,
	setErrorType,
}) => {
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');

	const handleAddNewName = (event) => {
		event.preventDefault();

		const newObject = {
			name: newName,
			number: newPhone,
		};

		const checkPerson = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);
		if (checkPerson) {
			alert(
				`${newName} is already added to phonebook, replace the old number with a new one?`
			);
			personService
				.updatePerson(checkPerson.id, newObject)
				.then((returnedResponse) => {
					const newPersonObject = persons.map((person) =>
						person.id === checkPerson.id ? returnedResponse : person
					);
					setPersons(newPersonObject);
					setOldPersons(newPersonObject);
				});
		} else {
			personService.create(newObject).then((returnedResponse) => {
				setPersons(persons.concat(returnedResponse));
				setOldPersons(persons.concat(returnedResponse));
				setErrorMessage(`Added ${newObject.name}`);
				setErrorType('success');

				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
			});
		}
		setNewName('');
		setNewPhone('');
	};

	const handleNewName = (event) => setNewName(event.target.value);
	const handleNewPhone = (event) => setNewPhone(event.target.value);

	return (
		<form onSubmit={handleAddNewName}>
			<div>
				name: <input value={newName} onChange={handleNewName} required />
			</div>
			<div>
				number:{' '}
				<input
					type='number'
					value={newPhone}
					onChange={handleNewPhone}
					required
				/>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};

export default PersonForm;
