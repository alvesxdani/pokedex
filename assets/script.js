const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImg = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = 'Loading...';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImg.src = data['sprites']['versions']['generation-v']
    ['black-white']['animated']['front_default'];
    inputSearch.value = "";
    searchPokemon = data.id;
  } else {
    pokemonNumber.innerHTML = "";
    pokemonName.innerHTML = "Not found!";
    pokemonImg.src = "";
    inputSearch.value = "";
  }
}
renderPokemon(searchPokemon);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(inputSearch.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
  if(searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

btnNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

