const { response } = require('express');
const { default: axios } = require('axios');

const router = require('express').Router();


router.get('/characters', async (req, res) => {
    try{
        function randomNum(max, min){
            // generate a random number
          
            // min not required
            if(min === undefined || min === '' || min === null){
              // min default value
              min = 0;
            }
          
            // random number, yay
            return Math.floor(Math.random() * (max - min) + min);
          }
        const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1)
        const pokeData = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=93&offset=0")
        const nthPokes = everyNth(pokeData.data.results, 3).concat(pokeData.data.results[24])
        const pokes = await Promise.all(nthPokes.map(item => {
            return axios.get(item.url)
        }))
        const pokemon = pokes.map(item => {
            return {
            name: item.data.forms[0].name,
            type: item.data.types[0].type.name,
            weakness: [],
            resistance: [],
            img: {
            default: item.data.sprites.front_default,
            front: item.data.sprites.front_default,
            back: item.data.sprites.back_default,
            },
            hp: {
            current: 500,
            total: 500
            },
            attacks: [
            {
                name: item.data.moves[0].move.name,
                hp: randomNum(40,20),
                avail: {
                total: 30,
                remaining: 30
                }
            },
            {
                name: item.data.moves[1].move.name,
                hp: randomNum(60,45),
                avail: {
                total: 10,
                remaining: 10
                }
            },
            {
                name: item.data.moves[2].move.name,
                hp: randomNum(75,60),
                avail: {
                total: 5,
                remaining: 5
                }
            },
            {
                name: item.data.moves[17].move.name,
                hp: randomNum(160, 130),
                avail: {
                total: 2,
                remaining: 2
                }
            }
            ]
        }
        })
        res.json(pokemon)
        console.log(pokemon)
    } catch (err) {
        res.status(500).json(err)
        console.log(err)
    }
})
// make new pokemon using class constructor
module.exports= router