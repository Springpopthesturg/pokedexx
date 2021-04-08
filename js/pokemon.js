let pokemonRepository = (function () {
  let pokedex = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll () {
    return pokedex;
  }

  function add (pokemon) {
    pokedex.push (pokemon);
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector (".pokemon-list");
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-dex');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    pokemonListener(pokemon, button);
  }

  function pokemonListener (pokemon, button) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    }
    )};

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  }; 
})();

pokemonRepository.getAll().forEach(function (pokemon) {
 pokemonRepository.addListItem(pokemon);
});