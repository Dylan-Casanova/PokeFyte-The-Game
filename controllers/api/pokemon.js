const { response } = require('express');
const { default: axios } = require('axios');

const router = require('express').Router();

class Pokemon {
    constructor(name, frontSprite, backSprite, hp, attack, move1, move2, type, userId){
        this.name = name;
        this.frontSprite = frontSprite;
        this.backSprite = backSprite;
        this.hp = hp;
        this.attack = attack;
        this.move1 = move1;
        this.move2 = move2;
        this.type= type
        this.user= userId
    }

    printStats() {
        console.log(`${this.name} has ${this.hp} hit points remaining!`);
    }

    isAlive() {
        if (this.hp <= 0) {
        console.log(`${this.name} has been defeated!`);
        return false;
        }
        return true;
    }

    attackOpponent(opponent) {
        const randomNum = () => Math.floor(Math.random()*100)
        const attackStrength = () => (randomNum/100)*this.attack
        opponent.hp -= attackStrength
        fetch(`/api/pokemon/${opponent.id}`, {
            method: 'PUT',
            body: JSON.stringify(opponent)
        })
    }
}


// router.get('/:name', async (req, res) => {
//     const thisPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
//     const newPoke = new Pokemon( 
//             thisPoke.data.forms[0].name, 
//             thisPoke.data.sprites.front_default,
//             thisPoke.data.sprites.back_default,
//             thisPoke.data.stats[0].base_stat,
//             thisPoke.data.stats[1].base_stat,
//             thisPoke.data.moves[0].move.name,
//             thisPoke.data.moves[1].move.name,
//             thisPoke.data.types[0].type.name,
//             req.session.user_id
//         )
//     res.json(newPoke)
// })

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
        const pokeData = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=45&offset=0")
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
                name: item.data.moves[3].move.name,
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