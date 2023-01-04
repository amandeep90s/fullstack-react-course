import React, { useState } from 'react';

const Filter = ({ persons, setPersons, initialData }) => {
	const [search, setSearch] = useState('');

	const handleSearch = (event) => {
		const searchField = event.target.value;
		setSearch(searchField);
		const filteredNumber = searchField
			? persons.filter((person) => person.name.toLowerCase().match(searchField))
			: initialData;
		setPersons(filteredNumber);
	};

	return (
		<div>
			filter shown with
			<input type='search' value={search} onChange={handleSearch} required />
		</div>
	);
};

export default Filter;
