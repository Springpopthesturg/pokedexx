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

pokemonList.foreach (function (pokemon)
  {
  if(pokemonList.height > 5) //this is the conditional
  {
    document.write(`${pokemonList.name}  (height: ${pokemonList.height})-This is a LARGE pokemon! <br>`) //this dictates what happens when the pokemon is large enough for the conditional.
  }
  else document.write(`${pokemonList.name}  (height: ${pokemonList.height} <br>`) //this is for all who dont meet conditional.
});
