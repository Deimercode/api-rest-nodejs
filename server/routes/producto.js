const express= require('express');
const { verificaToken }  = require('../middlewares/autenticacion');
let router =express.Router();
const productoController = require('../controllers/producto.controller');

//==================
//Obtener productos
//==================
router.get('/producto',verificaToken,productoController.obtenerProductos);

//==================
//Obtener un productos por id
//==================
router.get('/producto/:id',verificaToken,productoController.obtenerProductoId);

//==================
//buscar productos
//==================
router.get('/producto/buscar/:termino',verificaToken,productoController.buscarProductos);

//==================
// crear nuevo Productos
//==================
router.post('/producto',verificaToken,productoController.crearProductos);

//==================
//Actualizar Productos
//==================
router.put('/producto/:id',verificaToken,productoController.actualizaProducto);

//==================
//Borrar un producto
//==================
router.delete('/producto/:id',verificaToken,productoController.eliminarProducto);

module.exports = router;