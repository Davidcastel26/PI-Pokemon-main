const {Router} = require('express');
const axios = require('axios')
const { Pokemon, Type } = require('../db');
const router = Router();

router.get('/', (req, res, next) => {
    const PokemonFromApi = axios.get(`https://pokeapi.co/api/v2/pokemon`)
    const PokemonFromDb = Pokemon.findAll({
        include: Type
    })


    
    Promise.all([
        PokemonFromApi,
        PokemonFromDb
    ])
    .then((answer) => {

        const [PokemonFromApi, PokemonFromDb] = answer;
        
        // const [data] = PokemonFromApi;

        let filteredPokemonApi = PokemonFromApi.data.results.map((poke)=>{
            return{
                name:poke.name
            }
        })
        let allPokemons = [...filteredPokemonApi, ...PokemonFromDb]
        // console.log(PokemonFromApi);
        // console.log(PokemonFromDb);
        res.send(allPokemons)

    })
})

router.get('/:id', async(req, res, next) =>{
    const {id} = req.params;
    try {
        const onePokemon = await Pokemon.findByPk(id);
        res.json( onePokemon ? onePokemon: 'Sorry, that pokemon does not exist yet')
    } catch (error) {  
        next(error);
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
        res.status(201).send(newPokemon)
    } catch (error) {
        next(error);
    }
})

router.post('/:pokemonId/type/:typeId', async (req, res, next) =>{
    const {pokemonId, typeId} = req.params; 
    try {
        const pokemon = await Pokemon.findByPk(pokemonId)
        await pokemon.addType(typeId)
        res.send(200)
    } catch (error) {
        next(error)
    }
})

router.put('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})

router.delete('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})


module.exports = router;

/*
router.get('/', (req, res, next) => {
    return Pokemon.findAll({
        include: Type
    })
    .then((Pokemon )=>{
        res.send(Pokemon)
    })
    .catch((error) => {
        next(error)
    })
})
*/