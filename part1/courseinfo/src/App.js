import React, { useState } from 'react';

const App = () => {
	const [clicks, setClicks] = useState({
		left: 0,
		right: 0,
	});
	const [allClicks, setAllClicks] = useState([]);

	const handleLeftClick = () => {
		setAllClicks(allClicks.concat('L'));
		setClicks({ ...clicks, left: clicks.left + 1 });
	};

	const handleRightClick = () => {
		setAllClicks(allClicks.concat('R'));
		setClicks({ ...clicks, right: clicks.right + 1 });
	};

	return (
		<>
			{clicks.left}
			<Button handleClick={handleLeftClick} text='Left' />
			<Button handleClick={handleRightClick} text='Right' />
			{clicks.right}
			<History allClicks={allClicks} />
		</>
	);
};

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const History = (props) => {
	if (props.allClicks.length === 0) {
		return <div>this app is used by pressing the buttons</div>;
	}
	return <div>button press history: {props.allClicks.join(' ')}</div>;
};

export default App;
