const express = require('express')
const UsuarioController = require('../controllers/UsuarioController')
const TipoUsuarioController = require('../controllers/TipoUsuarioController')
const JogoController = require('../controllers/JogoController')
const GeneroController = require('../controllers/GeneroController')
const CarteiraController = require('../controllers/CarteiraController')
const RealizaVendaController = require('../controllers/RealizaVendaController')
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

//Rotas do CarteiraController
router.get('/getCarteira/:Cod_SeqCarteira?', CarteiraController.getCarteira)
router.get('/getCarteiraFiltro/', CarteiraController.getCarteiraFiltro)
router.post('/postCarteira', CarteiraController.postCarteira)
router.put('/putCarteira', CarteiraController.putCarteira)

//Rotas do RealizaVendaControle
router.post('/adicionaHorizonCarrinho', RealizaVendaController.adicionaHorizonCarrinho)
router.post('/adicionaFarCryCarrinho', RealizaVendaController.adicionaFarCryCarrinho)
router.post('/removeHorizonCarrinho', RealizaVendaController.removeHorizonCarrinho)
router.post('/removeFarCryCarrinho', RealizaVendaController.removeFarCryCarrinho)
router.post('/confirmaVendaHorizon', RealizaVendaController.confirmaVendaHorizon)
router.post('/confirmaVendaFarCry', RealizaVendaController.confirmaVendaFarCry)
router.post('/limpaVendasUsuario', RealizaVendaController.limpaVendasUsuario)
router.post('/postControleVendaUsuario', RealizaVendaController.postControleVendaUsuario)
router.get('/getVendasUsuario/:Cod_Usuario?', RealizaVendaController.getVendasUsuario)

module.exports = router
