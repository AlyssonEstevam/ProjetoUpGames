const express = require('express')
const ClienteController = require('../controllers/ClienteController')
const router = express.Router()

router.get('/getCliente/:id?', ClienteController.getCliente)
router.delete('/deleteCliente/:id', ClienteController.deleteCliente)
router.post('/postCliente', ClienteController.postCliente)
router.put('/putCliente', ClienteController.putCliente)

module.exports = router