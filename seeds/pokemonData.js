const { Pokemon } = require('../models');

const pokemondata = [
  {
    name: 'Bulbasaur',
    move_1: 'razor-wind',
    move_2: 'swords-dance',
    move_1_damage: 20,
    move_2_damage: 27,
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
    health_points: 45,
  },
  {
    name: 'Charmeleon',
    move_1: 'incinerate',
    move_2: 'flame-burst',
    move_1_damage: 20,
    move_2_damage: 25,
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/5.png',
    health_points: 58,
  },
  {
    name: 'Squirtle',
    move_1: 'mega-punch',
    move_2: 'water-gun',
    move_1_damage: 20,
    move_2_damage: 26,
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png',
    health_points: 44,
  },
  {
    name: 'Caterpie',
    move_1: 'string-shot',
    move_2: 'bug-bite',
    move_1_damage: 18,
    move_2_damage: 22,
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10.png',
    health_points: 45,
  },
  {
    name: 'Beedrill',
    move_1: 'cut',
    move_2: 'fury-attack',
    move_1_damage: 22,
    move_2_damage: 27,
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png',
    back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/15.png',
    health_points: 65,
  },
];

const seedPokemon = () => Pokemon.bulkCreate(pokemondata);

module.exports = seedPokemon;