import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import {
  creatCountriesList,
  creatCountriesMiniList,
} from './js/creatCountriesMarcup';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  let countryName = refs.input.value.trim();
  console.log(countryName);
  if (!countryName) {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
  .then(creatCounry)
  .catch(creatError);
};

function creatCounry(countrys) {
    console.log(countrys)
  if (countrys.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  if (countrys.length > 2 && countrys.length < 10) {
    const list = countrys
      .map(countrInfo => creatCountriesMiniList(countrInfo))
      .join('');
    refs.countryList.innerHTML = list;
    refs.countryInfo.innerHTML = '';
  }

  if (countrys.length === 1) {
    const marcup = countrys
      .map(countrInfo => creatCountriesList(countrInfo))
      .join('');
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = marcup;
  }
}

function creatError(error) {
  Notify.failure('Oops, there is no country with that name');
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  return error;
}
