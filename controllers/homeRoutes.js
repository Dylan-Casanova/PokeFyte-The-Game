const router = require('express').Router();
const { Pokemon, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const dbPokemonData = await Pokemon.findAll({
            attributes: [
                'id',
                'name',
                "front_default",
                'user_id'      
            ],
        });
  
        const pokemons = dbPokemonData.map((pokemon) =>
            pokemon.get({ plain: true })
        );
        // pass a single post object into the homepage template
        res.render('homepage', { 
            pokemons,
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});
  
module.exports = router;

