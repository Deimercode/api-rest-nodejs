const Categoria = require('../models/categoria');
const categoriaController = {};

categoriaController.obtenerCategorias = (req,res)=>{
    Categoria.find({})
    .sort('descripcion')
    .populate('usuario','nombre email')
    .exec((err,categorias)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            Categoria.countDocuments((err,conteo)=>{
                res.json({
                    ok:true,
                    categorias,
                    cuantos:conteo
                });
             })
    })
}

categoriaController.obtenerCategoria = (req,res)=>{
    let id = req.params.id;
    Categoria.findById(id,(err,categoriaDB)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    })
                }
                if(!categoriaDB){
                    return res.json({
                        ok:false,
                        err:{
                            message:'El id no es correcto'
                        }
                    })
                }
                res.json({
                    ok:true,
                    categoria:categoriaDB
                })
            })
}

categoriaController.crearCategoria = (req,res)=>{
    //req.usuario._id
    let body = req.body;
    let categoria = new Categoria({
        descripcion:body.descripcion,
        usuario:req.usuario._id
    })
    categoria.save((err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categoria:categoriaDB
        })
    })
    
    }

categoriaController.actualizaCategoria = (req,res)=>{
    let id = req.params.id;
    let body = req.body;
    let desCategoria={
        descripcion:body.descripcion
    }
    Categoria.findByIdAndUpdate(id,desCategoria,{new:true,runValidators:true},(err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categoria:categoriaDB
        })

    })
}

categoriaController.eliminarCategoria = (req,res)=>{
    let id = req.params.id;
    Categoria.findByIdAndRemove(id,(err,categoriaDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!categoriaDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El id no existe'
                }
            })
        }
        res.json({
            ok:true,
            message:'Categoria borrada'
        })
    })
}

module.exports = categoriaController;