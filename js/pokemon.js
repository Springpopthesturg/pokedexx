let pokemonList = [
  {name: 'Balbasaur' , type: ['poison' , 'grass'] , height: 2.04} ,
  {name: 'Charmander' , type: 'fire' , height: 2} ,
  {name: 'Charmeleon' , type: 'fire' , height: 3.07} ,
  {name: 'Charizard' , type: 'fire' , height: 5.07} ,
  {name: 'Squirtle' , type: 'water' , height: 1.04}
]


for (let i= 0; i < pokemonList.length ; i++) //having i add against the list
{
  if(pokemonList[i].height > 2.5)
  {
    document.write(`${pokemonList[i].name}  (height: ${pokemonList[i].height})-This is a medium sized pokemon! <br>`) 
  }
  else document.write(`${pokemonList[i].name}  (height: ${pokemonList[i].height} <br>`)
}