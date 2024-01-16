const Footer = () => {
	const footerStyle = {
		color: "green",
		fontStyle: "italic",
		fontSize: 15,
	};

	return (
		<div style={footerStyle}>
			<br />
			Phonebook app is sponsored by the Computer Science University of Helsinki
			2024
		</div>
	);
};

export default Footer;
