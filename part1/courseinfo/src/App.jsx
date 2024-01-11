const App = () => {
	const name = "Peter";
	const age = 33;

	const friends = [
		{ name: "Amandeep", age: 22 },
		{ name: "Mandeep", age: 23 },
	];

	const cars = ["BMW", "FORD"];

	return (
		<>
			<h1>Greetings</h1>
			<Hello name={name} age={age} />
			<Hello name="Kawaljit" age={28 + 2} />

			<p>
				{friends[0].name} {friends[0].age}
			</p>
			<p>
				{friends[1].name} {friends[1].age}
			</p>
			<p>{cars}</p>
			<Footer />
		</>
	);
};

const Hello = (props) => {
	console.log(props);
	return (
		<div>
			<p>
				Hello {props.name}, you are {props.age} years old
			</p>
		</div>
	);
};

const Footer = () => {
	return (
		<div>
			greeting app created by{" "}
			<a href="https://github.com/amandeep90s">amandeep90s</a>
		</div>
	);
};
export default App;
