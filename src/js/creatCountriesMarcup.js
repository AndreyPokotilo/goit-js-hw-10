export function creatCountriesList({
  name,
  capital,
  population,
  flags,
  languages,
}) {
  return `<div class="coutry-contaner">
      <img src="${flags.svg}" alt="${name.official}" width="60" height="40">
      <h1>${name.official}</h2>
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>
    </div>`;
}

export function creatCountriesMiniList({ name, flags }) {
  return `<li class="country-list_item">
        <img src="${flags.svg}" alt="${name.official}" width="60" height="40">
        <h2>${name.official}</h2>
      </li>`;
}
