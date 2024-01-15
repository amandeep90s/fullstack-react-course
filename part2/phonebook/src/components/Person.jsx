const Person = ({ person, handleDelete }) => {
	return (
		<p>
			{person.name} : {person.phone}{" "}
			<button onClick={() => handleDelete(person.id)}>Delete</button>
		</p>
	);
};

export default Person;
