const seedUsers = require('./userData');
const seedPokemon = require('./pokemonData');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedPokemon();
    process.exit(0);
};

seedAll();