export function fetchCountries(country) {
  const url = 'https://restcountries.com/v3.1/name/';
  const filter = '?fields=name,capital,population,flags,languages';
  return fetch(`${url}${country}${filter}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
