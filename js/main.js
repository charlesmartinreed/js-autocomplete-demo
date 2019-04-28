// DOM element variables
const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');

// Search states.json and filter it
const searchStates = async searchText => {
	if (searchText !== '') {
		// we're just using fetch to work with local data, no different than
		const res = await fetch('../data/states.json');
		const states = await res.json();

		// regEx match for current text input
		let matches = states.filter(({ name, abbr }) => {
			// regex is only matching the beginning - denoted by ^ - against the state
			const regex = new RegExp(`^${searchText}`, 'gi');

			return name.match(regex) || abbr.match(regex);
		});

		// now, we need to display our matches in the HTML
		outputHTML(matches);
	} else {
		matchList.innerHTML = '';
	}
}

const outputHTML = matches => {
	// map through matches array, make an array of html
	// join turns it into an actual string which we can put into the DOM
	let html = matches.map(({ name, abbr, capital, lat, long}) =>
		`<div class="card card-body mb-4">
			<h4>${name} (${abbr}) - <span class="text-warning">${capital}</span><h4>
			<small>Lat: ${lat} / Long: ${long}</small>
		</div>`
	).join('')

	matchList.innerHTML = html;
}

// Event Listeners
search.addEventListener('input', () => searchStates(search.value))
