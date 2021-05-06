const User = require('./User');
const Pokemon = require('./Pokemon');


Pokemon.belongsTo(User, {
    foreignKey: 'user_id',
  });


module.exports = { User, Pokemon };