const { Router } = require('express')
const router = Router();

//func 

router.get('/', (req,res, next)=>{
    res.send('holi /types')
})

module.exports = router;