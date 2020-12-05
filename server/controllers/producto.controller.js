let Producto = require('../models/producto');

const productoController= {}

productoController.obtenerProductos = (req,res)=>{

    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({disponible:true})
            .skip(desde)
            .limit(5)
            .populate('usaurio','nombre email')
            .populate('categoria','descripcion')
            .exec((err,productos)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    })
                }
                if(!productos){
                    return res.status(400).json({
                        ok:false,
                        err:{
                            messsage:'No hay productos registrados'
                        }
                    })
                }
                res.json({
                    ok:true,
                    productos
                })
            });
};

productoController.obtenerProductoId = (req,res)=>{
    let id =  req.params.id;
    Producto.findById(id)
    .populate('usuario','nombre email')
    .populate('categoria','descripcion')
    .exec((err,productoDB)=>{
        if(err){
            return res.status(501).json({
                ok:false,
                err
            })
        }

        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El id del producto no existe'
                }
            })
        }

         res.json({
            ok:true,
            producto:productoDB
        })
    })
  
};


productoController.buscarProductos = (req,res)=>{
    let termino = req.params.termino;
    let regex = new RegExp(termino,'i');
    Producto.find({nombre:regex})
            .populate('categoria','descripcion')
            .exec((err,productos)=>{
                if(err){
                    return res.status(500).json({
                        ok:false,
                        err
                    })
                }

                res.json({
                    ok:true,
                    productos
                })
                
            })
};


productoController.crearProductos = (req,res)=>{

    let body = req.body;

    let producto = new Producto({
        usuario:req.usuario._id,
        nombre: body.nombre,
        precioUni:body.precioUni,
        descripcion:body.descripcion,
        disponible:body.disponible,
        categoria:body.categoria,
    })

    producto.save((err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.status(201).json({
            ok:true,
            producto: productoDB
        })
    })
};

productoController.actualizaProducto = (req,res)=>{
    let id =  req.params.id;
    let body =  req.body;
    Producto.findById(id,(err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El id no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;
        
        productoDB.save((err,productoGuardado)=>{
            
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                producto:productoGuardado
            });
        })
    })
}

productoController.eliminarProducto = (req,res)=>{

    let id = req.params.id;

    Producto.findById(id,(err,productoDB)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'EL producto no existe'
                }
            })
        }
        productoDB.disponible = false;
        productoDB.save((err,productoBorrado)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }

            res.json({
                ok:true,
                productoBorrado,
                message:'Producto borrado'
            })
        })
    })
}
module.exports = productoController;