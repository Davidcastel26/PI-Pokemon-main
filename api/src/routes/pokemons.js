const {Router} = require('express');
const axios = require('axios')
const { Pokemon, Type } = require('../db');
const router = Router();

router.get('/', (req, res, next) => {
    const PokemonFromApi = axios.get(`https://pokeapi.co/api/v2/pokemon`);
    // tengo un array para que me guarde las url de cada pokemon
    // let urlData = []
    
    const PokemonFromDb = Pokemon.findAll({
        include: Type
    })

    Promise.all([
        PokemonFromApi,
        PokemonFromDb
    ])
    .then((answer) => {

        const [PokemonFromApi, PokemonFromDb] = answer;

        //extraigo el url y lo pusheo al array y con el axios entro para extaer la info de esa api
        // let filteredPokemonApi = PokemonFromApi.data.results.map(( poke )=> {
        //     urlData.push(
        //         //  axios.get(poke.url)
        //           poke.url
        //     )
        // })

        let datosPokemos = []
        let data = PokemonFromApi.data.results.map((poke)=> {
            let config = {
                method: 'get',
                url: poke.url,
                headers : {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
        let response = axios(config);
        datosPokemos.push(response)
        console.log(response.data);
        })

        // console.log(urlData);
        console.log(datosPokemos);

        const resApi_order = data.map( (poke) => {
            return ( {
                id: poke.id
            })
        })
        console.log(resApi_order);

        let allPokemons = [...resApi_order, ...PokemonFromDb]
        // console.log(PokemonFromApi);
        // console.log(PokemonFromDb);
        res.send(allPokemons)

    })
})

// https://pokeapi.co/api/v2/pokemon/:id

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