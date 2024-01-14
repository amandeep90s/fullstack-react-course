import Person from "./Person";

const Persons = ({ personsToShow }) => {
	return personsToShow.map((person) => (
		<Person person={person} key={person.name} />
	));
};

export default Persons;
