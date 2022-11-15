const express = require('express')
const {default: helmet} = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})



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