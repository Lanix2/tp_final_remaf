const { Pool } = require('pg')

const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'Remaf',
  password: '22767',
  port: 5432,
}
const pool = new Pool(connectionData)
pool.connect()


//pasar de location a puntos
//select ST_AsText(location) from public.weather_station;

//insertar puntos con su formato
// INSERT INTO public.weather_station(
//   name, location)
//  VALUES ('polo', 'POINT(-26.0814025635489 -58.27586964876695)');

// pool.query("INSERT INTO weather_station (name, location) values('polo 2', '0101000020E6100000DFB457B24F234DC0CA4064CCD6143AC1')")
//     .then(response => {
//         console.log(response.rows)
//         pool.end()
//     })
//     .catch(err => {
//         pool.end()
//     })

    // pool.query("SELECT * FROM weather_station")
    // .then(response => {
    //     console.log(response.rows)
    //     pool.end()
    // })
    // .catch(err => {
    //     pool.end()
    // })

  




module.exports = pool
//remaf()