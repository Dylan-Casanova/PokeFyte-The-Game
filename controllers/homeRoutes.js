const router = require('express').Router();
const { Pokemon } = require('../models');
const withAuth = require("../util/auth.js")

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

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const pokeData = await fetch("https://pokeapi.co/api/v2/pokemon?offset=300&limit=100")
        const pokemon = await pokeData.json();
        
        const pokes = pokemon.map(item => {
            return { name: item.forms[0].name, image: item.sprites.front_default }
        })

        if(req.session.logged_in) {
            res.render('dashboard',
            {pokes});
            return
        }
    } catch (err) {
        res.status(500)
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

