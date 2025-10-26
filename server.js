const express = require('express')
const Routes = require('./src/routes/routes')

const app = express()


app.use(express.json())
app.use(Routes)




 app.listen(8080, ()=>{
    console.log('conectado')
 })