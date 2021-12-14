const {Router} = require('express');
const router = Router();
const { 
        getPokemonById, 
        getAllthePokemons, 
        createAPokemon,
        createRelation,
        deletePokemon,
        upgratePokemon} = require('../helpers');

router.get('/', getAllthePokemons)

// https://pokeapi.co/api/v2/pokemon/:id
router.get('/:id', getPokemonById)

router.post('/', createAPokemon)

router.post('/:pokemonId/type/:typeId', createRelation )

router.put('/',upgratePokemon )

router.delete('/', deletePokemon)


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