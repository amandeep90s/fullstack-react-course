import { useState } from "react";

const App = (props) => {
	const [counter, setCounter] = useState(0);
	console.log("rendering with counter value", counter);

	const increaseByOne = () => {
		console.log("increasing, value before", counter);
		setCounter(counter + 1);
	};
	const decreaseByOne = () => {
		console.log("decreasing, value before", counter);
		setCounter(counter - 1);
	};

	const setZero = () => {
		console.log("resetting to zero, value before", counter);
		setCounter(0);
	};

	return (
		<div>
			<Display counter={counter} />
			<Button text="plus" onClick={increaseByOne} />
			<Button text="reset" onClick={setZero} />
			<Button text="minus" onClick={decreaseByOne} />
		</div>
	);
};

const Display = ({ counter }) => <div>{counter}</div>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default App;
