// const {Router} = require('express');
const axios = require('axios')
const { response } = require('har-validator')
const { Pokemon, Type } = require('./db')

const getAllthePokemons = async(req, res, next) => {
    const PokemonFromApi = axios.get(`https://pokeapi.co/api/v2/pokemon`)
    
    // tengo un array para que me guarde las url de cada pokemon
    // let urlData = []
    // const { results } = PokemonFromApi;
    // console.log(PokemonFromApi);
    


const PokemonFromDb = Pokemon.findAll({
    include: Type
})

Promise.all([
    PokemonFromApi,
    PokemonFromDb
])
.then((answer) => {
    const [PokemonFromApi, PokemonFromDb] = answer;
    
    let datosPokemos = []
    const info = PokemonFromApi.data.results.map(async (poke)=> {
        
        let config = {
            method: 'get',
            url: poke.url,
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        
        let response = await axios(config)
        // .then((data)=>{datosPokemos.push(data)})
        .then( (responseFromApi) => {
            console.log(responseFromApi.data.forms[0]);
            
            
            for (const poke in responseFromApi.data) {
                datosPokemos.push({
                    poke
                })
            }
            // const 
            // console.log(responseFromApi.data.typeof())
            // console.log(resApi_order);
        
        })
        .catch(err =>{
            console.log(err);
        })
        // console.log(response)
     }   
    )
        
        // console.log(response.id)
        // console.log(response);
    
      console.log(datosPokemos);
            

    // console.log(resApi_order);

    let allPokemons = [...PokemonFromDb ,...datosPokemos]
        // console.log(PokemonFromApi );
        // console.log(PokemonFromDb);
    res.send(allPokemons)

    })
}

const getPokemonById = async(req, res, next) =>{
    const {id} = req.params;
    try {
        const onePokemon = await Pokemon.findByPk(id);
        res.json( onePokemon ? onePokemon: 'Sorry, that pokemon does not exist yet')
    } catch (error) {  
        next(error);
    }
}

const createAPokemon = async (req, res, next) => {
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
}

const createRelation = async (req, res, next) =>{
    const {pokemonId, typeId} = req.params; 
    try {
        const pokemon = await Pokemon.findByPk(pokemonId)
        await pokemon.addType(typeId)
        res.send(200)
    } catch (error) {
        next(error)
    }
}

const upgratePokemon = (req, res, next) => {
    res.send('i am get/ pokemons')
}

const deletePokemon = async(req, res, next) => {
    res.send('i am get/ pokemons')
}


module.exports = {
    getAllthePokemons,
    getPokemonById,
    createAPokemon,
    createRelation,
    deletePokemon,
    upgratePokemon
}


/*
//extraigo el url y lo pusheo al array y con el axios entro para extaer la info de esa api
        // let filteredPokemonApi = PokemonFromApi.data.results.map(( poke )=> {
        //     urlData.push(
        //         //  axios.get(poke.url)
        //           poke.url
        //     )
        // })

*/