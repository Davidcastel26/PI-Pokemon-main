// const {Router} = require('express');
const axios = require('axios')
// const { response } = require('har-validator')
const { Pokemon, Type } = require('./db')

const getPokemonFromApi = async () => {
    try {
        let info = [];
        for (let i = 1; i <= 40; i++) {
            info.push(axios.get('https://pokeapi.co/api/v2/pokemon/' + i));
        }
        return Promise.all(info).then((response) => {
            const pokemones = response.map((details) => {
                return (poke = {
                    name: details.data.name,
                    id: details.data.id,
                    img: details.data.sprites.other.home.front_default,
                    types: details.data.types.map((e) => e.type.name),
                    attack: details.data.stats[1].base_stat,
                    height: details.data.height,
                    weight: details.data.weight,
                    hp: details.data.stats[0].base_stat,
                    defense: details.data.stats[2].base_stat,
                    speed: details.data.stats[5].base_stat,
                });
            });
            return pokemones;
        });
        
    } catch (error) {
        console.log(error);
    }
};

const getPokemonFromDb = async() => {
    try {
        
        let poke = Pokemon.findAll({
            include: {
                model: Type,
            },
            attributes: ['name','img','attack',"defense",'hp','speed' ],
        })
        return poke

    } catch (error) {
        console.log(error);
    }
}

const getAllPokemonsTogether = async () =>{
    const apiInfo = await getPokemonFromApi();
    const dbInfo = await getPokemonFromDb();
    // const infoTotal = apiInfo.concat(dbInfo);
    const infoTotal = [...apiInfo, ...dbInfo]
    return infoTotal 
}

const getAllthePokemons = async(req,res,next)=>{
    const name = req.query.name
    
    try {

         let pokemonTotal = await getAllPokemonsTogether();
         if(name){
             let pokemonName = await pokemonTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            pokemonName.length ? 
            res.send(pokemonName) :
            res.status(404).send('Pokemon dont found');
         }else{
            res.send(pokemonTotal)
         }

     } catch (error) {
         next(error)
     }
}


const getPokemonById = async(req, res, next) =>{
    const {id} = req.params.id;
    let onePokemon;
    try {
        if(typeof id === 'string' && id.length > 7){
            onePokemon = await Pokemon.findByPk(id);
            res.json( onePokemon ? onePokemon: 'Sorry, that pokemon does not exist yet')
        } 
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
    // tengo un array para que me guarde las url de cada pokemon
    // let urlData = []
    // const { results } = PokemonFromApi;
    // console.log(PokemonFromApi);
    



//extraigo el url y lo pusheo al array y con el axios entro para extaer la info de esa api
        // let filteredPokemonApi = PokemonFromApi.data.results.map(( poke )=> {
        //     urlData.push(
        //         //  axios.get(poke.url)
        //           poke.url
        //     )
        // })

*/