// const {Router} = require('express');
const axios = require('axios')
// const { response } = require('har-validator')
const { Pokemon, Type } = require('./db')


// we are fetching the info from the poke api
const getPokemonFromApi = async () => {
    try {
        //setting an array in order to be ablee to save all the url from the api 
        let info = [];
        for (let i = 1; i <= 40; i++) {
            // saving the urls into the array and FETCHING every single url
            info.push(axios.get('https://pokeapi.co/api/v2/pokemon/' + i));
        }
        //since we are calling the urls into the array as a fetch we are calling all the porimises
        //we need to use .then in order to get the info
        return Promise.all(info).then((response) => {
            //we are get in to the every single pokemon and calling the data that is contains
            const pokemones = response.map((details) => {
                //we are retriving and OBJ
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

// this is an arrow func that will allow us to get the data from our database
const getPokemonFromDb = async() => {
    try {
        //we are using sequelized methods here .findAll and then we are calling some params
        let poke = Pokemon.findAll({
            //inclue is a part of our ralation table
            include: {
                model: Type,
            },
            //attributes are part from our pokemon (check the database to see whats contains)
            attributes: ['id','name','img','attack',"defense",'hp','speed','height','weight' ],
        })
        return poke

    } catch (error) {
        console.log(error);
    }
}

// this arrow func is concating the data from the api and db info
const getAllPokemonsTogether = async () =>{
    //we are calling the functions and waiting for the data response
    const apiInfo = await getPokemonFromApi();
    const dbInfo = await getPokemonFromDb();
    // const infoTotal = apiInfo.concat(dbInfo);
    const infoTotal = [...apiInfo, ...dbInfo]
    return infoTotal;
}

// this func froms part from our pokemons routs
// we will request all the info from infoTotal and search for it
const getAllthePokemons = async(req,res,next)=>{
    // we could use ? in order to request by name a pokemon
    const name = req.query.name
    
    try {
        //we are callin the total info
         let pokemonTotal = await getAllPokemonsTogether();
        //the if will be check if there is any name in the router get /
        //if there is somethign look for it 
         if(name){
             //checking if the url includes a name 
             // using the toLowercase since we wont want to search just in upercar or in lowercase
             let pokemonName = await pokemonTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            pokemonName.length ? 
            // if there somehting in name and if we have somethig related with it show that data
            res.send(pokemonName) :
            //if we do not have something related with that name 
            res.status(404).send('Pokemon dont found');
         }
         //if there isn't a name retrive all the data
         else{
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
/*
const upgratePokemon = (req, res, next) => {
    res.send('i am get/ pokemons')
}

const deletePokemon = async(req, res, next) => {
    res.send('i am get/ pokemons')
}
*/

module.exports = {
    getAllthePokemons,
    getPokemonById,
    createAPokemon,
    createRelation,
    /*
    deletePokemon,
    upgratePokemon
    */
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

    

I WAS TRYING TO GET THE API USEING THIS WAY BUT THAT DOES NOT WORK 
-----------------------------------------------------------------------------------

const getAllthePokemons = async(req, res, next) => {
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
        
            let response = await axios(config).then( (responseFromApi) => {

                

                for(let i = 0 ; i < responseFromApi.data.length; i++){
                    datosPokemos.push(responseFromApi[i].id)
                }

            })
            .catch(err =>{
                console.log(err);
            })

        })
        console.log(datosPokemos);

        let allPokemons = [...PokemonFromDb ,...datosPokemos]

        res.send(allPokemons)

    })
}


*/
