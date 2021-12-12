const {Router} = require('express');
const { Pokemon } = require('../db')
const router = Router();

router.get('/', (req, res, next) => {
    return Pokemon.findAll()
    .then((Pokemon )=>{
        res.send(Pokemon)
    })
})

router.get('/:id', async(req, res, next) =>{
    const {id} = req.params;
    try {
        const onePokemon = await Pokemon.findByPk(id);
        res.json( onePokemon? onePokemon: 'Sorry, that pokemon does not exist yet')
    } catch (error) {  
        console.log(error);
    }
})

router.post('/', async (req, res, next) => {
    const { name, hp, attack, defense, speed, height, weight, img} = req.body;
    try {
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
    } catch (error) {
        console.log(error);
    }
})

router.put('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})

router.delete('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})


module.exports = router;