const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoute = require('./pokemons')
const typesRoute = require('./types')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemon', pokemonRoute)
router.use('/types', typesRoute)

module.exports = router;
