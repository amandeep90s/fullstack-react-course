const Country = ({ country }) => {
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
		</div>
	);
};

export default Country;
