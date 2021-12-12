const {Router} = require('express');

const router = Router();

router.get('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})

router.post('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})

router.put('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})

router.delete('/', (req, res, next) => {
    res.send('i am get/ pokemons')
})


module.exports = router;