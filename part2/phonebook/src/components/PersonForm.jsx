const PersonForm = ({
	handleSubmit,
	handleNewName,
	handleNewPhone,
	newName,
	newPhone,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input type="text" value={newName} onChange={handleNewName} />
			</div>
			<div>
				phone: <input type="text" value={newPhone} onChange={handleNewPhone} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};

export default PersonForm;
