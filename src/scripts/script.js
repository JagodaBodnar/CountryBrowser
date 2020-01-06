const fetch = require('node-fetch');

const url = 'https://restcountries.eu/rest/v2/name/';
let countriesList = document.getElementById('countries');

document.getElementById('search').addEventListener('click', searchCountries);

function searchCountries () {
  var countryName = document.getElementById('country-name').value;
  if (!countryName.length) countryName = ' ';
  fetch(url + countryName)
    .then(function (resp) {
      return resp.json();
    })
    .then(showCountriesList)
    .catch(err => console.log(err));
}

function showCountriesList (resp) {
  countriesList.innerHTML = '';
  resp.forEach(function (item) {
    let flag = document.createElement('img');
    flag.src = `${item.flag}`;
    flag.alt = `country flag`;
    flag.classList.add('flag');
    countriesList.appendChild(flag);

    let name = document.createElement('div');
    name.innerText = `Country: ${item.name}`;
    countriesList.appendChild(name);

    let capital = document.createElement('div');
    capital.innerText = `Capital: ${item.capital}`;
    countriesList.appendChild(capital);

    let region = document.createElement('div');
    region.innerText = `Region: ${item.region}`;
    countriesList.appendChild(region);
    let population = document.createElement('div');
    let rounding = new Intl.NumberFormat('en-GB', {
      maximumSignificantDigits: 3
    }).format(item.population);
    population.innerText = `Population: ${rounding}`;
    countriesList.appendChild(population);

    let language = document.createElement('div');
    language.innerText =
      `Languages: ` + `${item.languages.map(c => c.name).join(`, `)}`;
    countriesList.appendChild(language);

    let currencies = document.createElement('div');
    currencies.innerText =
      `Currencies: ` +
      `${item.currencies.map(c => `${c.name} (${c.code})`).join(`, `)}`;
    countriesList.appendChild(currencies);
  });
}
