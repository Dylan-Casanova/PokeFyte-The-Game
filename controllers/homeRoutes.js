const router = require('express').Router();
const { default: axios } = require('axios');
const { response } = require('express');
const { Pokemon } = require('../models');
const withAuth = require('../util/auth');

//get all pokemons for home page
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
router.get('/dashboard2', async (req, res) => {
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
        res.render('cards', { 
            pokemons,
            type: item.data.types[0].type.name,
            loggedIn: req.session.loggedIn 
        });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1)
        const pokeData = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=93&offset=0")

        const nthPokes = everyNth(pokeData.data.results, 3).concat(pokeData.data.results[24])

        const pokes = await Promise.all(nthPokes.map(item => {
            return axios.get(item.url)
        }))
        const pokemon = pokes.map(item => {
            return { 
                name: item.data.forms[0].name, 
                image: item.data.sprites.front_default,
                hp: item.data.stats[0].base_stat,
                attack: item.data.stats[1].base_stat,
                move1: item.data.moves[0].move.name,
                move2: item.data.moves[1].move.name,
                move3: item.data.moves[2].move.name,
                move4: item.data.moves[17].move.name,
                type: item.data.types[0].type.name
            }
        })

        // console.log(pokemon)

            res.render('cards',
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

