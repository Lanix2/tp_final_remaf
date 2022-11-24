const pool = require( '../../server')
const ctrlUser = {}


ctrlUser.get_datos = async(req, res) => {

      let datos = []
      console.log("entro")
    
    let items = await pool.query('SELECT * FROM WEATHER_STATION')
    console.log(items.rows)
    return res.send(items.rows)

    
}






module.exports = ctrlUser