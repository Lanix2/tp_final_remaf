const router = require('express').Router();



const { 
    get_datos
    ,inicializador_de_datos
    ,get_fechas
   
} = require('../controllers/datos.controllers')

router.get('/', inicializador_de_datos)
router.get('/get_datos', get_datos)
router.get('/get_fechas', get_fechas)
//router.get('/set_datos', crearEstaciones)


module.exports = router