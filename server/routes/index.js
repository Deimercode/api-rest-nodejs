const express = require('express');

const router = express.Router();
router.use('/api',require('./usuario'));
router.use('/api',require('./login'));
router.use('/api',require('./categoria'));
router.use('/api',require('./producto'))
router.use('/api',require('./upload'))
router.use('/api',require('./imagenes'))
module.exports = router;