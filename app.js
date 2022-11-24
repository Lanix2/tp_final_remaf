const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const fetch = require('node-fetch')
var cron = require('node-cron')
const {default: helmet} = require('helmet')
const pool = require('./server')

const app = express()

async function validacionPostgre(){
  console.log("conectando")
  const estaciones = await remaf()
  console.log(estaciones);
  console.log("cargando datos");

  estaciones.forEach(async e =>{
      //let existe = [{"id": 0} ,{"existe":false}, {"datos": 0}]  
      const id = e.id
      //const weather_station = await pool.query("SELECT * FROM weather_station")
      //console.log(weather_station.rows);

      for (const key in e) {
        e[key] = (e[key] == "undefined")? undefined: e[key];
      }

      /* weather_station.rows.forEach(elem =>{
        if(elem.id_weather_station == id){
          existe.existe = true
          existe.id =id
          existe.datos = e
        }
      }) */
      
      const {precipitacion, humedad, temperatura, direcc_viento, veloc_viento , localidad, nombre, latitud, longitud} = e
      const fecha = new Date(e.fecha).toISOString().slice(0, 19).replace('T', ' ')
      console.log(precipitacion, humedad, temperatura, direcc_viento, veloc_viento , localidad, nombre, latitud, longitud);
      const resuelvo = await pool.query('select insert_update_data($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[parseFloat(precipitacion), parseFloat(humedad), parseFloat(temperatura),
        fecha, direcc_viento, parseFloat(veloc_viento),
        localidad, parseInt(id), nombre, parseFloat(longitud), parseFloat(latitud)])
      /* if(existe.existe){
        await pool.query(`UPDATE data_station
        SET precipitacion=${precipitacion}, humedad=${humedad}, temperatura=${temperatura}, 
        fecha='${fecha}', direcc_viento='${direcc_viento}', veloc_viento=${veloc_viento_f}, localidad='${localidad}'
        WHERE fk_weather_station = ${existe.id}`)

        //Esta parte esta comentada a parte: DESDE AQUI
        'UPDATE data_station\
        SET precipitacion=$1, humedad=$2, temperatura=$3, \
        fecha=$4, direcc_viento=$5, veloc_viento=$6, localidad=$7\
        WHERE fk_weather_station = $8',[precipitacion, humedad, temperatura, fecha, direcc_viento, veloc_viento_f, localidad, existe.id] 
        //HASTA AQUI
      }else{
        console.log("antes" + veloc_viento);
        const qr = `INSERT INTO weather_station(
          id_weather_station, name, location)
          VALUES (${e.id}, '${nombre}', 'POINT(${longitud} ${latitud})');
          
          INSERT INTO data_station(
            precipitacion, humedad, temperatura, fk_weather_station, fecha, direcc_viento, veloc_viento, localidad)
           VALUES ( ${precipitacion}, ${humedad}, ${temperatura}, ${e.id}, '${fecha}', '${direcc_viento}', '${veloc_viento_f}', '${localidad}');
          
          `
          console.log(qr);
        await pool.query(qr)
        console.log("despues");
          
      } */
  })
  console.log(existe);
  //return false
  //pool.end()
  
  console.log(weather_station.rows);

}

cron.schedule('5 * * * * *',validacionPostgre)

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  const remaf = async () => {
    const general = "https://api-remaf.onrender.com/api"
    const fecha = "https://api-remaf.onrender.com/api/1/'2022-10-26'"
    const fecha_hasta = "https://api-remaf.onrender.com/api/2/'2022-10-01'/'2022-11-30'"
    
    const response = await fetch(general);
    const body = await response.json()
    //console.log(body)
    return body
  }
  
  
  
  // "node-fetch": "2.0",
  //https://api-remaf.onrender.com/api
  //middlewares
  app.use(helmet())
  app.use(cors())
  app.use(morgan('combined'))
  app.use(express.json())
  
  //routes
  app.use('/datos', require('./src/routes/datos.routes'))
  
  //configs
  const port = process.env.PORT || 3000
  
  //archivos estátivos
  
  app.listen(port, () => {
      console.log(`Corriendo en el puerto ${port}`)
    })