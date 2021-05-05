const router = require('express').Router();
const { default: axios } = require('axios');
const { response } = require('express');
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
        const pokeData = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=15&offset=0")
        const pokes = await Promise.all(pokeData.data.results.map(item => {
            return axios.get(item.url)
        }))
        const pokemon = pokes.map(item => {
            return { name: item.data.forms[0].name, image: item.data.sprites.front_default }
        })

        console.log(pokemon)

            res.render('dashboard',
            {pokemon});
            return
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

