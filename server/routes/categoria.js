const express =  require('express');
const router = express.Router();
const {verificaToken }= require('../middlewares/autenticacion');
const categoriaController = require('../controllers/categoria.controller');

//Mostrar todas las categorias
router.get('/categoria',verificaToken, categoriaController.obtenerCategorias);
//Mostrar una categoria por id
router.get('/categoria/:id',verificaToken,categoriaController.obtenerCategorias);
//Crear nueva categoria
router.post('/categoria', verificaToken,categoriaController.crearCategoria);
//Actualizar categoria
router.put('/categoria/:id',verificaToken,categoriaController.actualizaCategoria);
//Borrar una categoria
router.delete('/categoria/:id',verificaToken,categoriaController.eliminarCategoria);

module.exports = router;