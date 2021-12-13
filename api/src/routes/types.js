const { Router } = require('express');
const { Type } = require('../db');
const router = Router();

//func 

router.get('/', async (req,res, next)=>{
    // const {name} = req.params;
    try {
        const types = await Type.findAll()
        res.send({order:[['name','ASC']]})
    } catch (error) {
        next(error)
    }
})

module.exports = router;