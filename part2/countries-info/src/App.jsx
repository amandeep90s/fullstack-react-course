import axios from "axios";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const handleChange = (event) => setSearchTerm(event.target.value);

	useEffect(() => {
		axios
			.get("https://studies.cs.helsinki.fi/restcountries/api/all")
			.then((response) => {
				const { data } = response;

				if (data?.length > 0) {
					setCountries(data);
				}
			})
			.catch((error) => setErrorMessage(error.message));
	}, []);

	useEffect(() => {
		setErrorMessage(null);
		setFilteredCountries([]);

		if (searchTerm) {
			const result = countries.filter((country) =>
				country?.name?.common?.toLowerCase().includes(searchTerm.toLowerCase())
			);

			if (result.length > 0 && result.length < 11) {
				setFilteredCountries(result);
			} else {
				setErrorMessage("Too many matches, specify another filter");
			}
		}
	}, [countries, searchTerm]);

	return (
		<div>
			<label htmlFor="search">Find Countries</label>
			<input
				type="text"
				id="search"
				value={searchTerm}
				onChange={handleChange}
			/>

			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

			<CountryList countries={filteredCountries} showCountry={setSearchTerm} />
		</div>
	);
};

export default App;
