import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountry';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

function onSearchInput(e) {
  e.preventDefault();
  const nameCountry = refs.input.value.trim();
  if (!nameCountry) {
    refs.list.innerHTML = '';
    refs.info.innerHTML = '';
    return;
  }
  fetchCountries(nameCountry).then(onRenderCountry).catch(onError);
};

function onRenderCountry(countrys) {
  console.log(countrys);
if (countrys.length > 10) {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
  Notify.info('Too many matches found. Please enter a more specific name.');
}
if (countrys.length >= 2 && countrys.length <= 10) {
  const listCountry = countrys
    .map(({ name, flags }) => {
      return `<li class="list-item">
      <img class="img-flag"
       src="${flags.svg}"
       alt="${name.official}" 
       width="50" height="40">
      <h2 class="name">${name.official}</h2>
      </li>`;
    })
    .join('').trim();
  refs.list.innerHTML = listCountry;
  refs.info.innerHTML = '';
  return;
}
if (countrys.length === 1) {
  const cardCountry = countrys.map(
    ({ name, flags, capital, population, languages }) => {
      const lang = Object.values(languages).join(' ,')
      console.log(lang);
      return `<div class="country-card-name">
             <img class="card-flag" src="${flags.svg}" alt="${name.official}" width="60" height="50">
             <h2 class="card-name">${name.official}</h2>
             </div>
             <ul>
             <li class="card-item-name"><span class="text-content-name">Capital:</span>${capital}</li>
             <li class="card-item-name"><span class="text-content-name">Population:</span>${population}</li>
             <li class="card-item-name"><span class="text-content-name">Languages:</span>${lang}</li>
             </ul>`;
    }
  ).join().trim();
  refs.list.innerHTML = '';
  refs.info.innerHTML = cardCountry;
  return;
}
}

function onError(error) {
  Notify.failure('Oops, there is no country with that name');
  console.log(error);
  return error
};
