import React from 'react';

const Notification = ({ message, type }) => {
	const successStyle = {
		fontSize: 20,
		color: 'green',
		backgroundColor: 'darkgrey',
		borderRadius: 5,
		padding: 10,
		borderStyle: 'solid',
		marginBottom: 10,
	};

	const errorStyle = {
		fontSize: 20,
		color: 'red',
		backgroundColor: 'darkgrey',
		borderRadius: 5,
		padding: 10,
		borderStyle: 'solid',
		marginBottom: 10,
	};

	if (message === null) {
		return null;
	}

	return (
		<div style={type === 'success' ? successStyle : errorStyle}>{message}</div>
	);
};

export default Notification;
