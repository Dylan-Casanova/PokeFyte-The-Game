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


router.get('/api/pokemon/:name', async (req, res) => {
    const thisPoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.name}`)
    const newPoke = new Pokemon( 
            thisPoke.data.forms[0].name, 
            thisPoke.data.sprites.front_default,
            thisPoke.data.sprites.back_default,
            thisPoke.data.stats[0].base_stat,
            thisPoke.data.stats[1].base_stat,
            thisPoke.data.moves[0].move.name,
            thisPoke.data.moves[1].move.name,
            thisPoke.data.types[0].type.name,
            req.session.user_id
        )
    res.json(newPoke)
})
// make new pokemon using class constructor

module.exports= router