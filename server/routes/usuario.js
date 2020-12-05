const express = require('express');
const router = express.Router();
const { verificaToken,verificaAdminRole }= require('../middlewares/autenticacion');
const  usuarioController = require('../controllers/usuario.controller');

router.get('/usuario',[verificaToken,verificaAdminRole],usuarioController.obtenerUsuarios);
router.post('/usuario',[verificaToken,verificaAdminRole],usuarioController.crearUsuario);
router.put('/usuario/:id',[verificaToken,verificaAdminRole],usuarioController.actualizarUsuario);
router.delete('/usuario/:id',[verificaToken,verificaAdminRole],usuarioController.eliminarUsuario);

module.exports = router;