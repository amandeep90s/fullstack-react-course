import Person from "./Person";

const Persons = ({ personsToShow, handleDelete }) => {
	return personsToShow.map((person) => (
		<Person person={person} handleDelete={handleDelete} key={person.name} />
	));
};

export default Persons;
