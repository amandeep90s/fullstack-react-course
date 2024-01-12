import { useState } from "react";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const feedbackValue = { good: 1, neutral: 0, bad: -1 };
	const totalFeedback = good + neutral + bad;
	const totalScore =
		good * feedbackValue.good +
		neutral * feedbackValue.neutral +
		bad * feedbackValue.bad;
	const averageScore = totalScore / totalFeedback || 0;
	const positiveFeedback = (good / totalFeedback) * 100 || 0;

	return (
		<>
			<Heading title="Give feedback" />
			<Button handleClick={() => setGood(good + 1)} text="good" />
			<Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button handleClick={() => setBad(bad + 1)} text="bad" />
			<Heading title="Statistics" />

			<Statistics
				good={good}
				bad={bad}
				neutral={neutral}
				totalFeedback={totalFeedback}
				averageScore={averageScore}
				positiveFeedback={positiveFeedback}
			/>
		</>
	);
};

const Heading = ({ title }) => <h1>{title}</h1>;

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
	<p>
		{text}:{value}
	</p>
);

const Statistics = (props) => {
	if (!props.good && !props.bad && !props.neutral) {
		return <p>Ne feedback given</p>;
	}

	return (
		<>
			<StatisticLine text="good" value={props.good} />
			<StatisticLine text="neutral" value={props.neutral} />
			<StatisticLine text="bad" value={props.bad} />
			<StatisticLine text="all" value={props.totalFeedback} />
			<StatisticLine
				text="average"
				value={Math.floor(props.averageScore * 10) / 10}
			/>
			<StatisticLine
				text="positive"
				value={`${Math.floor(props.positiveFeedback * 10) / 10} %`}
			/>
		</>
	);
};

export default App;
