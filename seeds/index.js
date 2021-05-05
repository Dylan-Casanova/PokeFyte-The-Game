const sequelize = require('../config/connection');
const seedPokemon = require('./pokemonData');
const seedUser = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPokemon();

  await seedUser();

  process.exit(0);
};

seedAll();