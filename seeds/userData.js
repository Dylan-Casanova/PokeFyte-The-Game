const { User } = require('../models');

const userdata = [

{
    "username": 'Lucas523',
    "email": 'sal@hotmail.com',
    "password": 'qazwsxedc'
    // "pokemon_id": 1,
  },
  {
    "username": "Ian341",
    "email": "lernantino@gmail.com",
    "password": "qazwsxedc",
    // "pokemon_id": 5,
  },
  {
    "username": "Yi235",
    "email": "amiko2k20@aol.com",
    "password": "qazwsxedc",
    // "pokemon_id": 7,
  },
  {
    "username": "Adam215",
    "email": "am2220@aol.com",
    "password": "qazwsxedc",
    // "pokemon_id": 10,
  },
  {
    "username": "Dylan55",
    "email": "a454o2k20@aol.com",
    "password": "qazwsxedc",
    // "pokemon_id": 15,
  },

];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;