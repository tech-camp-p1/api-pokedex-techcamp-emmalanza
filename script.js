const POKE_CONTAINER = document.getElementById('poke-container');
const POKEMON_LIMIT = 150;
const POKE_API = `https://pokeapi.co/api/v2/pokemon`;

const TYPES_COLORS = {
    fire: '#FF6F61',
    grass: '#7AC74C',
    electric: '#F7D02C',
    water: '#6390F0',
    ground: '#E2BF65',
    rock: '#B6A136',
    fairy: '#D685AD',
    poison: '#A33EA1',
    bug: '#A6B91A',
    dragon: '#6F35FC',
    psychic: '#F95587',
    flying: '#A98FF3',
    fighting: '#C22E28',
    normal: '#A8A77A'
};

async function getPokemons(url) {
	try{

		const response = await fetch(url + `?limit=${POKEMON_LIMIT}`);
		if (!response.ok) {
		  throw new Error('Hubo un problema con la respuesta de la red');
		}
	
		// Parsear los datos en formato JSON
		const pokemons = await response.json();

		console.log(pokemons);

	    for (let pokemon of pokemons.results) {
			const pokemonResponse = await fetch(url + `/${pokemon.name}`);
			const pokemonData = await pokemonResponse.json();
			console.log(pokemonData);
			renderPokemonCards(pokemonData);
		  }


	}catch(error){
		console.log("Error:", error);

	}
}

function renderPokemonCards(pokemon) {

	let divPokemon = document.createElement('div');
	divPokemon.classList.add('pokemon');
	let divImg = document.createElement('div');
	divImg.classList.add('img-container');
	let img = document.createElement('img');
	img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/refs/heads/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;
	divImg.appendChild(img);
	divPokemon.appendChild(divImg);

	let divInfo = document.createElement('div');	
	divInfo.classList.add('info');
	let spanNumber = document.createElement('span');
	spanNumber.classList.add('number');
	spanNumber.textContent = `#${mapId(pokemon.id)}`;
	let h3Name = document.createElement('h3');
	h3Name.classList.add('name');
	h3Name.textContent = capitalizeFirstLetter(pokemon.name);
	divInfo.appendChild(spanNumber);
	divInfo.appendChild(h3Name);
	divPokemon.appendChild(divInfo);

	let divTypes = document.createElement('div');
	divTypes.classList.add('types');
	pokemon.types.forEach(type => {
		let spanType = document.createElement('span');
		spanType.classList.add('type');
		spanType.textContent = capitalizeFirstLetter(type.type.name);
		spanType.style.backgroundColor = TYPES_COLORS[type.type.name];
		divTypes.appendChild(spanType);
	});
	divPokemon.appendChild(divTypes);
	

	POKE_CONTAINER.appendChild(divPokemon);
	
}

function capitalizeFirstLetter(str) {
  if (!str) return ''; 
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function mapId(id) {
	
	switch (id.toString().length) {
        case 1: return "00" + id;
        case 2: return "0" + id;
  
    }
    return id;
}

getPokemons(POKE_API);