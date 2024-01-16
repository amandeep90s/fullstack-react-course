import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		const API_KEY = import.meta.env.VITE_APP_WAETHER_API_KEY;
		const lat = country.capitalInfo.latlng[0];
		const lon = country.capitalInfo.latlng[1];
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
		axios.get(url).then(({ data }) => {
			setWeather(data);
		});
	}, []);

	if (!weather) {
		return null;
	}

	const icon = weather.weather[0].icon;
	const weatherIconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

	return (
		<div>
			<h1>{country.name.common}</h1>

			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area}</p>

			<h4>Languages</h4>
			<ul>
				{Object.values(country.languages).map((lang) => (
					<li key={lang}>{lang}</li>
				))}
			</ul>

			<img src={country.flags.png} alt={country.name.common} width={150} />

			<h4>Weather in {country.capital[0]}</h4>

			<p>temperature {weather.main.temp} Celsius</p>

			<img src={weatherIconUrl} width="80" />

			<p>wind {weather.wind.speed} m/s</p>
		</div>
	);
};

export default Country;
