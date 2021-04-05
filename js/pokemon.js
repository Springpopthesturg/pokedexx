let pokemonRepository = (function () {
  let pokedex = [
    {name: 'Balbasaur' , type: ['poison' , 'grass'] , height: 2.04} ,
    {name: 'Charmander' , type: 'fire' , height: 2} ,
    {name: 'Charmeleon' , type: 'fire' , height: 3.07} ,
    {name: 'Charizard' , type: 'fire' , height: 5.07} ,
    {name: 'Squirtle' , type: 'water' , height: 1.04}
  ];

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