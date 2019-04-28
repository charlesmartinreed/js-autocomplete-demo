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
		let matches = states.filter((state) => {
			// regex is only matching the beginning - denoted by ^ - against the state
			const regex = new RegExp(`^${searchText}`, 'gi');

			return state.name.match(regex) || state.abbr.match(regex);
		});

		console.log(matches);
	}
}

// Event Listeners
search.addEventListener('input', () => searchStates(search.value))
