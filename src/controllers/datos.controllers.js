const pool = require( '../../server')
const ctrlUser = {}

ctrlUser.inicializador_de_datos = async(req, res) => {
  const datos_station = await pool.query('SELECT * FROM WEATHER_STATION')
  
  return res.send(datos_station.rows)
}

ctrlUser.get_datos = async(req, res) => {
  //ultima peticion
  
  //console.log(req.body)
  const id_estacion = req.body.id_estacion    
  const devolver = await pool.query('select * from data_station where fk_weather_station = $1 order by fecha desc limit 1',[id_estacion])
  return res.send(devolver.rows)
}

ctrlUser.get_fechas = async(req, res) => {
  //ultima peticion
  
  //console.log(req.body)
  const { fecha_ini, fecha_fin, id_estacion} = req.body
  if( fecha_fin < fecha_ini ||  fecha_ini == "" || fecha_fin == "" || id_estacion == "") return res.send("Fecha incorrecta")
  
  const devolver = await pool.query('select * from data_station where fecha >= $1 and fecha <= $2 and fk_weather_station = $3',[fecha_ini, fecha_fin, id_estacion])
  
  return res.send(devolver.rows)
  
  
}



// ctrlUser.crearEstaciones = async()=>{
//   //setDate con getDate se puede utilizar para sumar los dias.
//   try {
//     let desde = new Date(2022, 03, 1)
//     let hasta = new Date(2022, 11, 1)
//     const time = (hasta-desde)
//     const intervalo = time/(1000*60*60*24)
//     console.log(intervalo);
//     await pool.query('select crearestaciones($1)',[intervalo])
//     return ' ASDSDASDSA'
//   } catch (error) {
//     console.error(error);
//     return 
//   }
// }






module.exports = ctrlUser