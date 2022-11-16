const express = require('express')
const {default: helmet} = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const fetch = require('node-fetch');
const { Client } = require('pg')
var cron = require('node-cron');

const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'Remaf',
  password: '22767',
  port: 5432,
}
const client = new Client(connectionData)

client.connect()

cron.schedule('* * * * *', () => {
  remaf()
});

//pasar de location a puntos
//select ST_AsText(location) from public.weather_station;

//insertar puntos con su formato
// INSERT INTO public.weather_station(
//   name, location)
//  VALUES ('polo', 'POINT(-26.0814025635489 -58.27586964876695)');

// client.query("INSERT INTO weather_station (name, location) values('polo 2', '0101000020E6100000DFB457B24F234DC0CA4064CCD6143AC1')")
//     .then(response => {
//         console.log(response.rows)
//         client.end()
//     })
//     .catch(err => {
//         client.end()
//     })

    // client.query("SELECT * FROM weather_station")
    // .then(response => {
    //     console.log(response.rows)
    //     client.end()
    // })
    // .catch(err => {
    //     client.end()
    // })

    



app.get('/', (req, res) => {
  res.send('Hello World!')
})


// "node-fetch": "2.0",
//https://api-remaf.onrender.com/api
//middlewares
app.use(helmet())
app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

//routes

//configs
const port = process.env.PORT || 3000

//archivos estátivos

app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
  })

  
const remaf = async () => {
  const response = await fetch('https://api-remaf.onrender.com/api');
  const body = await response.json()
  console.log(body)
  return body
}


//remaf()