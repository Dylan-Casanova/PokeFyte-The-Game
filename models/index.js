const User = require('./User');
const Pokemon = require('./Pokemon');


Pokemon.belongsTo(User, {
    foreignKey: 'pokemon_id',
  });


module.exports = { User, Pokemon };