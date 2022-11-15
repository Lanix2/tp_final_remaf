const express = require('express')
const {default: helmet} = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const fetch = require('node-fetch');

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


remaf()