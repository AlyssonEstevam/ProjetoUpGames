const express = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const TipoUsuarioController = require('../controllers/TipoUsuarioController')
const JogoController = require('../controllers/JogoController')
const GeneroController = require('../controllers/GeneroController')
const router = express.Router()

//Rotas do UsuarioController
router.get('/getUsuario/:Cod_SeqUsuario?', UsuarioController.getUsuario)
router.get('/getUsuarioByLogin/:Nom_Login?', UsuarioController.getUsuarioByLogin)
router.get('/getUsuarioFiltro/', UsuarioController.getUsuarioFiltro)
router.delete('/deleteUsuario/:Cod_SeqUsuario', UsuarioController.deleteUsuario)
router.post('/postUsuario', UsuarioController.postUsuario)
router.put('/putUsuario', UsuarioController.putUsuario)

//Rotas do TipoUsuarioController
router.get('/getTipoUsuario/', TipoUsuarioController.getTipoUsuario)

//Rotas do JogoController
router.get('/getJogo/:Cod_SeqJogo?', JogoController.getJogo)
router.get('/getJogoFiltro/', JogoController.getJogoFiltro)
router.delete('/deleteJogo/:Cod_SeqJogo', JogoController.deleteJogo)
router.post('/postJogo', JogoController.postJogo)
router.put('/putJogo', JogoController.putJogo)

//Rotas do GeneroController
router.get('/getGenero/:Cod_SeqGenero?', GeneroController.getGenero)
router.delete('/deleteGenero/:Cod_SeqGenero', GeneroController.deleteGenero)
router.post('/postGenero', GeneroController.postGenero)
router.put('/putGenero', GeneroController.putGenero)

module.exports = router