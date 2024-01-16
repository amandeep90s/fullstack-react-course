import Country from "./Country";

const CountryList = ({ countries, showCountry }) => {
	if (countries.length === 1) {
		return <Country country={countries[0]} />;
	}

	return countries.map((country) => (
		<div key={country.name.common}>
			<p>
				{country.name.common}:{" "}
				<button type="button" onClick={() => showCountry(country.name.common)}>
					show
				</button>
			</p>
		</div>
	));
};

export default CountryList;
