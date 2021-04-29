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
  }
  //listing format for pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.classList.add('list-group-item-action');
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
        console.error(e);
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
      }).then(function (details) {
        //add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        returnValue(details.types);
      }).catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon)
    });
  }


  //Bootstrap modal
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $("modal-title");
    modalTitle.empty();
    modalBody.empty();
    //name creation in modal
    let nameElement = $("<h1>" + item.name + "</h1>");
    //img modal content
    let imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", item.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", item.imageUrlBack);
    //Height modal content
    let heightElement = $("<p>" + "height : " + item.height + "</p>")
    //Weight modal content
    let weightElement = $("<p>" + "weight : " + item.weight + "</p>")
    //Pokemon types modal content
    let typesElement = $("<p>" + "types : " + item.types + "</p>")

    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
  }

  pokemonList.forEach(function (pokemon) {
    console.log(pokemon.innerText);
    if (pokemon.innerText.toUpperCase().indexOf(filterValue) > -1) {
      pokemon.style.display = '';
    }
    else {
      pokemon.style.display = 'none';
    }
  })

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
});

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});