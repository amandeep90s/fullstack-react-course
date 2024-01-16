import axios from "axios";
import { useState } from "react";

const App = () => {
	const [value, setValue] = useState("");
	const [rates, setRates] = useState({});

	const handleChange = (event) => setValue(event.target.value);

	const onSearch = (event) => {
		event.preventDefault();
		if (value) {
			axios
				.get(`https://open.er-api.com/v6/latest/${value}`)
				.then(({ data }) => {
					setRates(data.rates);
				});
		}
	};

	return (
		<div>
			<form onSubmit={onSearch}>
				currency:{" "}
				<input
					type="text"
					value={value}
					onChange={handleChange}
					style={{ textTransform: "uppercase" }}
				/>
				<button type="submit">exchange rate</button>
			</form>

			<pre>{JSON.stringify(rates, null, 2)}</pre>
		</div>
	);
};

export default App;
