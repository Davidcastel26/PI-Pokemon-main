const {Router} = require('express');
const { Pokemon } = require('../db')
const router = Router();

router.get('/', (req, res, next) => {
    return Pokemon.findAll()
    .then((Pokemon )=>{
        res.send(Pokemon)
    })
})

router.post('/', async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight, img} = req.body;
    const newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img
    })
    res.send(newPokemon)
})

router.put('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})

router.delete('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})


module.exports = router;