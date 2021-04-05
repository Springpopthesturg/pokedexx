let pokemonRepository = (function () {
  let pokemonList = [
    {name: 'Balbasaur' , type: ['poison' , 'grass'] , height: 2.04} ,
    {name: 'Charmander' , type: 'fire' , height: 2} ,
    {name: 'Charmeleon' , type: 'fire' , height: 3.07} ,
    {name: 'Charizard' , type: 'fire' , height: 5.07} ,
    {name: 'Squirtle' , type: 'water' , height: 1.04}
  ];

  function getAll () {
    return pokemonList;
  }

  function add (pokemon) {
    pokemonList.push (pokemon);
  }

  return {
    getAll: getAll,
    add: add
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 5) {
    document.write(
      `${pokemon.name} (height: ${pokemon.height})-This is a LARGE pokemon! <br>`
    );
  } else {
    document.write(`${pokemon.name} (height: ${pokemon.height}) <br>`);
  }
});