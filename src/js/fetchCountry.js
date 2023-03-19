const url = 'https://restcountries.com/v3.1/name/';
const filter = '?fields=name,capital,population,flags,languages'


 function fetchCountries(nameCountry) {
   return fetch(`${url}${nameCountry}${filter}`)
.then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
})
}

export {fetchCountries}