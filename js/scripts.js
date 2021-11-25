let pokemonRepository = (function () {
  let pokedex = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokedex;
  }

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokedex.push(pokemon);
    }
    else {
      /* eslint-disable no-console */
      console.error("pokemon is not correct");
      /* eslint-disable no-console */
    }
  }
  //listing format for pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('pokemon-list-item');
    listPokemon.classList.add('pokemon-list-item-action');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn');
    button.classList.add('btn-block');
    button.setAttribute('data-target', '#pokemonModal');
    button.setAttribute('data-toggle', 'modal');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    pokemonListener(pokemon, button);

    //creating listener if someone clicks on a pokemon
    function pokemonListener(pokemon, button) {
      button.addEventListener('click', function () {
        showDetails(pokemon);
      }
      )
    }
  };
  //loading the pokemon names
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-disable no-console */
      })
  }

  function returnValue(object) {
    for (let key of Object.keys(object)) {
      let value = object[key].type.name;
      return value
    }
  }

  //loading the details of pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        //add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        returnValue(details.types);
      })
      .catch(function (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-disable no-console */
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      modalTitle.empty();
      modalBody.empty();

      //pokemons name
      let pokemonName = $('<h1>' + pokemon.name + '</h1>');
      //picture of pokemon
      let pokemonImage = $('<img class="modal-img" style="width:50%">');
      pokemonImage.attr('src', pokemon.imageUrl);
      //height of pokemon
      let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');
      //the pokemons types
      let pokemonTypes = document.createElement('span');
      let types = 'Types: ';
      pokemon.types.forEach(function(item) {
        types += item.type.name + ' ';
      });
      pokemonTypes.innerHTML = types;

      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonTypes);

      $('#pokemonModal').modal('toggle');
    });
  }

  return {
    getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})()

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});


