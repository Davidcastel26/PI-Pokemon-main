const { Router } = require('express');
const { Type } = require('../db');
const axios = require('axios');
const router = Router();

//func 
const getTypes = async() =>{
    //traer me las cosas de los types de la api
    //get with map
    const result = axios.get('https://pokeapi.co/api/v2/type');
    const { data } = await result;
    const { results } = await data;
    // console.log(data.results);
    results.map( async(element)=> (
        await Type.create({
            name: element.name
        }))
    )
}
getTypes()

router.get('/', async (req,res, next)=>{
    // const {name} = req.params;
    try {
        const types = await Type.findAll({order:[['name','ASC']]})
        res.send(types)
    } catch (error) {
        next(error)
    }
})

module.exports = router;