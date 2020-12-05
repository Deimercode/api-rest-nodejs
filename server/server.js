const express = require('express');
require('./config/config');
const app = express();
const mongoose = require('mongoose');
const bodyparse = require('body-parser');
const path = require('path');
//middlewares 
//app.use(express.json());
app.use(bodyparse.urlencoded({extended:true}))
// configuracion global de rutas
app.use(require('./routes/index'));



//habilitar la carpeta public
app.use(express.static(path.resolve(__dirname+'../public')));

mongoose.connect('mongodb://localhost:27017/cafe',{ useCreateIndex : true,useUnifiedTopology:true,useNewUrlParser:true},(err,res)=>{
    if(err) throw err;
    console.log('Base de datos online');
})
app.listen(process.env.PORT,()=>{
    console.log('Escuchando puerto',process.env.PORT);
})