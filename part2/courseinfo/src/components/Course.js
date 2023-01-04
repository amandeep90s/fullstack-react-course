import React from 'react';
import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
	// let total = 0;
	// course.parts.map((part) => (total += part.exercises));

	const total = course.parts.reduce((s, p) => {
		return s + p.exercises;
	}, 0);

	return (
		<>
			<Header title={course.name} />
			<Content parts={course.parts} />
			<h4>total of {total} exercises</h4>
		</>
	);
};

export default Course;
