import React, { useState } from 'react';

const PersonForm = ({ persons, setPersons, setOldPersons }) => {
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');

	const handleAddNewName = (event) => {
		event.preventDefault();

		const newObject = {
			name: newName,
			number: newPhone,
			id: persons.length + 1,
		};

		if (
			persons.some(
				(person) => person.name.toLowerCase() === newName.toLowerCase()
			)
		) {
			alert(`${newName} is already added to phonebook`);
			return;
		}

		setPersons(persons.concat(newObject));
		setOldPersons(persons.concat(newObject));
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
