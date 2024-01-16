const Filter = ({ filter, setFilter }) => {
	return (
		<div>
			Filter shown with:
			<input
				type="text"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			/>
		</div>
	);
};

export default Filter;
