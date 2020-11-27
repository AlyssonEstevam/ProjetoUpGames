const express = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const router = express.Router()

router.get('/getUsuario/:Cod_SeqUsuario?', UsuarioController.getUsuario)
router.delete('/deleteUsuario/:Cod_SeqUsuario', UsuarioController.deleteUsuario)
router.post('/postUsuario', UsuarioController.postUsuario)
router.put('/putUsuario', UsuarioController.putUsuario)

module.exports = router