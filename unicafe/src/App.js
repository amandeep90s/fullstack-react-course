import React, { useState } from 'react';

const Title = ({ title }) => {
	return <h1>{title}</h1>;
};

const Button = ({ text, handleClick }) => {
	return (
		<button type='button' onClick={handleClick}>
			{text}
		</button>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	if (good + neutral + bad === 0) {
		return <p>no feedback given</p>;
	}

	return (
		<>
			<table>
				<tbody>
					<StatisticLine text='good' value={good} />
					<StatisticLine text='neutral' value={neutral} />
					<StatisticLine text='bad' value={bad} />
					<StatisticLine text='all' value={good + neutral + bad} />
					<StatisticLine text='average' value={(good + neutral + bad) / 3} />
					<StatisticLine
						text='positive'
						value={`${(100 * good) / (good + neutral + bad)} %`}
					/>
				</tbody>
			</table>
		</>
	);
};

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<>
			<Title title='give feedback' />
			<Button text='good' handleClick={() => setGood(good + 1)} />
			<Button text='neutral' handleClick={() => setNeutral(neutral + 1)} />
			<Button text='bad' handleClick={() => setBad(bad + 1)} />
			<Title title='statistics' />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</>
	);
};

export default App;
