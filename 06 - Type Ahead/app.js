const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const suggestions = document.querySelector('.suggestions');
const search = document.querySelector('.search');

const getCities = async url => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const cities = await response.json();
      return cities;
    }
    throw new Error('Request failed!');
  } catch(err) {
    console.log('Invalid request: ', err);
  }  
};

const filterCities = (term, cities) => {
  const regex = new RegExp(term, 'gi');
  const filtredCities = cities.filter(city => city.city.match(regex) || city.state.match(regex));

  return filtredCities;
}

const formatPopulation = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const renderSuggestions = (term, cities) => {
  const regex = new RegExp(term, 'gi');

  const html = cities.map(city => {
    const cityHighlighted = city.city.replace(regex, `<span class="hl">${term}</span>`)
    const stateHighlighted = city.state.replace(regex, `<span class="hl">${term}</span>`)
    return `
    <li>
      <span class="name">${cityHighlighted}, ${stateHighlighted}</span>
      <span class="population">${formatPopulation(city.population)}</span>
    </li>
    `;
  }).join('');

  suggestions.innerHTML = html;
};

search.addEventListener('keyup', function() {
  getCities(endpoint)
  .then(cities => filterCities(this.value, cities))
  .then(filtredCities => renderSuggestions(this.value, filtredCities));
})