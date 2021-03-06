// const {Router} = requir// const {Router} = require('express');
const axios = require('axios')
// const { response } = require('har-validator')
const { Op } = require('sequelize')
const { Pokemon, Type } = require('./db')

// we are fetching the info from the poke api
const getPokemonFromApi = async () => {
    try {
        //setting an array in order to be ablee to save all the url from the api
        const poke_res = (await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=25`)).data.results
        let info = [];
        // for (let i = 1; i <= 40; i++) {
        //     // saving the urls into the array and FETCHING every single url
        //     info.push(await axios.get(`https://pokeapi.co/api/v2/pokemon` + i));
        // }
        for (let pk of poke_res) {
            info.push(axios.get(pk.url))
        }

        // console.log(info);
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
                    types: details.data.types.map((e) => e.type.name).join(', '),
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
const getPokemonFromDb = async (name) => {
    let poke;
    try {
        if (name) {
            //we are using sequelized methods here .findAll and then we are calling some params
            poke = Pokemon.findAll({
                //inclue is a part of our ralation table
                include: {
                    model: Type,
                }, //chosing the name from shearch bar
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%" //
                    }
                },
                //attributes are part from our pokemon (check the database to see whats contains)
                attributes: ['id', 'name', 'img', 'attack', "defense", 'hp', 'speed', 'height', 'weight'],
            })
        }
        else {
            poke = Pokemon.findAll({
                //inclue is a part of our ralation table
                include: {
                    model: Type,
                },
                //attributes are part from our pokemon (check the database to see whats contains)
                attributes: ['id', 'name', 'img', 'attack', "defense", 'hp', 'speed', 'height', 'weight'],
            })
        }
        return poke
        
    } catch (error) {
        console.log(error);
    }
}

const pokeByNameApi = async (name) => {
    let pokeInfo = []
    try {
        let responses = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        const { data } = await responses;
        const newObj = Object.entries(data)
        pokeInfo.push(Object.fromEntries(newObj))
        /* */
        const getinfoFromPokemon = pokeInfo.map(details => {
            return (poke = {
                name: details.name,
                id: details.id,
                img: details.sprites.other.home.front_default,
                types: details.types.map((e) => e.type.name).join(', '),
                attack: details.stats[1].base_stat,
                height: details.height,
                weight: details.weight,
                hp: details.stats[0].base_stat,
                defense: details.stats[2].base_stat,
                speed: details.stats[5].base_stat,
            })
        })
        //    /**/
        //    return getinfoFromPokemon
        return getinfoFromPokemon
        //    return data
        // return pokeInfo;
    } catch (err) {
        console.log(err);
    }
}


//is not working no more
// this arrow func is concating the data from the api and db info
const getAllPokemonsTogether = async () => {
    //we are calling the functions and waiting for the data response
    const apiInfo = await getPokemonFromApi();
    const dbInfo = await getPokemonFromDb();
    // const infoTotal = apiInfo.concat(dbInfo);
    const infoTotal = [...apiInfo, ...dbInfo]
    return infoTotal;
}

// this func froms part from our pokemons routs
// we will request all the info from infoTotal and search for it
const getAllthePokemons = async (req, res, next) => {
    // we could use ? in order to request by name a pokemon
    const name = req.query.name

    try {
        //we are callin the total info
        let pokemonTotal = await getAllPokemonsTogether();
        //the if will be check if there is any name in the router get /
        //if there is somethign look for it
        if (name) {
            //checking if the url includes a name
            // using the toLowercase since we wont want to search just in upercar or in lowercase
            // let pokemonName = await pokemonTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            let pokemonNameAPI = pokeByNameApi(name)
            let pokemonNameDB = Pokemon.findAll({
                //inclue is a part of our ralation table
                include: {
                    model: Type,
                }, //chosing the name from shearch bar
                where: {
                    name: {
                        [Op.iLike]: "%" + name + "%" //
                    }
                },
                //attributes are part from our pokemon (check the database to see whats contains)
                attributes: ['id', 'name', 'img', 'attack', "defense", 'hp', 'speed', 'height', 'weight'],
            })

            Promise.all([
                pokemonNameAPI,
                pokemonNameDB
            ]).then((response) => {
                //return the anwers from the both promises
                const [pokemonNameAPI, pokemonNameDB] = response
                let pokemonsNames;
                // created an if since one of the was saying that unable to read property of undefined [null]
                 // the search needed to be exactly
                if(pokemonNameAPI) {
                 pokemonsNames = [...pokemonNameAPI]
                  res.send(pokemonsNames) 
                } else {
                     pokemonsNames = [...pokemonNameDB]
                     res.send(pokemonsNames) 
                }
            })
            // let pokemonNameDB = await getPokemonFromDb(name)


            // pokemonsNames.length ?
                // if there somehting in name and if we have somethig related with it show that data
                // res.send([pokemonNameDB[0], pokemonNameAPI])
                // res.send(pokemonsNames) 
                //if we do not have something related with that name
                // res.status(404).send('Pokemon dont found');
        }
        //if there isn't a name retrive all the data
        else {
            res.send(pokemonTotal)
        }

    } catch (error) {
        next(error)
    }
}

// this func froms part from our pokemons routs
// we will request all the info from infoTotal and search for it
// ==============IMPORTANT==========================================================
// const getPokemonsByName = async(req,res,next)=>{
//     // we could use ? in order to request by name a pokemon
//     const {name} = req.query
//     const lowername = name.toLowerCase()

//     try {
//         //we are callin the total info
//         // FROM DB
//         let arr = []
//          let getPokemonFrom_Db = await getPokemonFromDb(lowername);
//         // FROM api
//         let getPokemonFrom_Api = await pokeByNameApi(lowername);
//         // console.log(getPokemonFrom_Api);
//         // arr.push(getPokemonFrom_Api, getPokemonFrom_Db)
//         // console.log(arr);
//         const nameArrangement = [...getPokemonFrom_Db, getPokemonFrom_Api]
//         // arr.push(nameArrangement)
//         res.send({res: nameArrangement})
//         // res.send([...getPokemonFrom_Db,...getPokemonFrom_Api])
//         // res.send(arr)
//      } catch (error) {
//          next(error)
//      }
//  }
// ==============IMPORTANT==========================================================


const getPokemonById = async (req, res, next) => {
    const { id } = req.params;
    let onePokemon;
    try {
        if (typeof id === 'string' && id.length > 12) {
            //findbypk is = to the sqelize
            onePokemon = await Pokemon.findByPk(id);
            res.json(onePokemon ? onePokemon : 'Sorry, that pokemon does not exist yet')
        } else if (id.length < 7) {
            let pokeInfo = []
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            //    console.log(response);
            const { data } = await response;
            //    console.log(data);
            const newObj = Object.entries(data)
            // Obj entries will give me all the info as an array
            // but we do not have with to comparate with
            // console.log(newObj);
            pokeInfo.push(Object.fromEntries(newObj))
            //so we need to use (fromEntries) that will convine all the arrays into the obj
            //    console.log(pokeInfo);

            const getinfoFromPokemon = pokeInfo.map(details => {
                return (poke = {
                    name: details.name,
                    id: details.id,
                    img: details.sprites.other.home.front_default,
                    types: details.types.map((e) => e.type.name).join(', '),
                    attack: details.stats[1].base_stat,
                    height: details.height,
                    weight: details.weight,
                    hp: details.stats[0].base_stat,
                    defense: details.stats[2].base_stat,
                    speed: details.stats[5].base_stat,
                })
            })
            onePokemon = getinfoFromPokemon[0]
            res.send(onePokemon)
        }
    } catch (error) {
        next(error);
    }
}

const createAPokemon = async (req, res, next) => {
    // needed to pass TYPES
    const { name, hp, attack, defense, speed, height, weight, img, types } = req.body;
    try {
        const newPokemon = await Pokemon.create({
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            img,
        })
        // types : []
        //if there are types loop into it
        types?.map(async (types) => {
            //searching using squelized
            //types is an arrar
            //findaLL will return the same value from the table types
            let poke_t = await Type.findAll(
                {
                    where: { name: types } // name : grass
                }
            )
            //relation with the pokemon that we are creating
            //since we already know that exist and we already look into it
            newPokemon.addType(poke_t)
        })
        res.status(201).send(newPokemon)
    } catch (error) {
        next(error);
    }
}

const createRelation = async (req, res, next) => {
    const { pokemonId, typeId } = req.params;
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
    //    getPokemonsByName,
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
 
 
------------------------------GOOD CODE JUST WAITING FOR THE UPDATE ------------
 
console.log(pageHandler());
 
// we are fetching the info from the poke api
const getPokemonFromApi = async () => {
   try {
       //setting an array in order to be ablee to save all the url from the api
       let info = [];
       for (let i = 1; i <= 40; i++) {
           // saving the urls into the array and FETCHING every single url
           info.push(await axios.get(`https://pokeapi.co/api/v2/pokemon/` + i));
       }
       console.log(info);
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
                   types: details.data.types.map((e) => e.type.name).join(', '),
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
 
-----SEARCH POKEMON-----------------------------------------------------------------------
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
*/