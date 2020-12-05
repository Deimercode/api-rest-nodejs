const express =  require('express');
const router = express.Router();
const path = require('path');
const {verificaTokenImg} = require('../middlewares/autenticacion');
const fs = require('fs');


router.get('/imagen/:tipo/:img',verificaTokenImg,(req,res)=>{

    let tipo = req.params.tipo;
    let imagen = req.params.img;

    let pathImagen = path.resolve(__dirname,`../../uploads/${tipo}/${imagen}`);

    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen);
    }else{
        let noImagePath = path.resolve(__dirname,'../assets/no-image.png');
         res.sendFile(noImagePath);
    }
    
})



module.exports = router;