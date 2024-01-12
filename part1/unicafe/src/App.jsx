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
			<Info text="good" value={good} />
			<Info text="neutral" value={neutral} />
			<Info text="bad" value={bad} />
			<Info text="all" value={totalFeedback} />
			<Info text="average" value={averageScore} />
			<Info text="positive" value={positiveFeedback} />
		</>
	);
};

const Heading = ({ title }) => <h1>{title}</h1>;

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

const Info = ({ text, value }) => (
	<p>
		{text}:{value}
	</p>
);

export default App;
