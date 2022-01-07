const {Router} = require('express');
const router = Router();
const { 
        getAllthePokemons,
        getPokemonById, 
        getPokemonsByName, 
        createAPokemon,
        createRelation,
        /*deletePokemon,
upgratePokemon*/} = require('../helpers');

router.get('/', getAllthePokemons)

// https://pokeapi.co/api/v2/pokemon/:id
router.get('/:id', getPokemonById)

router.post('/', createAPokemon)

// router.get('name', getPokemonsByName)

/*
router.put('/',upgratePokemon )

router.delete('/', deletePokemon)
*/

module.exports = router;