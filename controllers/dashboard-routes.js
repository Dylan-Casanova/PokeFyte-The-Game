const router = require('express').Router();
const sequelize = require('../config/connection');
const { Pokemon, User } = require('../models');
const withAuth = require('../util/auth');
router.get('/', withAuth, (req, res) => {
    Pokemon.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'name',
                'health_points'
            ],
              include: [
             //   {
            //         model: Comment,
            //         attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            //         include: {
            //             model: User,
            //             attributes: ['username']
            //         }
            //     },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        .then(dbPokemonData => {
            const pokemons = dbPokemonData.map(pokemon => pokemon.get({ plain: true }));
            res.render('dashboard', { pokemons, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Pokemon.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'name',
                'health_points'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                // {
                //     model: Comment,
                //     attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                //     include: {
                //         model: User,
                //         attributes: ['username']
                //     }
                // }
            ]
        })
        .then(dbPokemonData => {
            if (!dbPokemonData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const pokemon = dbPokemonData.get({ plain: true });
            res.render('edit-pokemon', { pokemon, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})



module.exports = router;