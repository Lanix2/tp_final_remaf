const router = require('express').Router();



const { 
    get_datos
   
} = require('../controllers/datos.controllers')


router.get('/get_datos', get_datos)


module.exports = router