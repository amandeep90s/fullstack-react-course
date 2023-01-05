import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [showCountries, setShowCountries] = useState([]);
	const [search, setSearch] = useState('');
	const [countryIndex, setCountryIndex] = useState(-1);

	const hook = () => {
		axios.get('https://restcountries.com/v2/all').then((response) => {
			setCountries(response.data);
		});
	};

	useEffect(hook, []);

	const handleSearch = (event) => {
		const query = event.target.value;
		setSearch(query);
		setCountryIndex(-1);

		const filteredCountries =
			query.length > 0
				? countries.filter((country) =>
						country.name.toLowerCase().match(query.toLowerCase())
				  )
				: [];
		setShowCountries(filteredCountries);
	};

	const handleCountryDetail = (index) => {
		setCountryIndex(index);
		axios
			.get(
				`http://api.openweathermap.org/data/3.0/onecall?lat=${showCountries[index]?.latlng[0]}&lon=${showCountries[index]?.latlng[1]}&exclude=hourly,daily&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
			)
			.then((response) => {
				console.log(response.data);
			});
	};

	return (
		<>
			<div>
				find countries{' '}
				<input type='search' value={search} onChange={handleSearch} />
			</div>

			{showCountries.length > 10 ? (
				<p>Too many matches, specify another filter.</p>
			) : (
				showCountries.map((country, index) => (
					<p key={country.name}>
						{index + 1}. {country.name}{' '}
						<button onClick={() => handleCountryDetail(index)}>Show</button>
					</p>
				))
			)}

			{showCountries.length > 0 && countryIndex > -1 && (
				<>
					<h1>Country: {showCountries[countryIndex]?.name}</h1>
					<p>capital {showCountries[countryIndex]?.capital}</p>
					<p>area {showCountries[countryIndex]?.area}</p>

					<h5>languages</h5>
					<ul>
						{showCountries[countryIndex]?.languages?.map((language) => (
							<li key={language.name}>{language.name}</li>
						))}
					</ul>
					<div
						style={{
							background: '#ededed',
							width: 'auto',
							padding: '10px',
							display: 'inline-block',
						}}
					>
						<img
							src={showCountries[countryIndex]?.flag}
							alt={showCountries[countryIndex]?.name}
							width='200'
						/>
					</div>
				</>
			)}
		</>
	);
};

export default App;
