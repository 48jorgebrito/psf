const express = require('express')
const router = express.Router()
const user = require('../controllers/usersController')
const session = require('../controllers/sessionsController')

//ROTA DE LOGIN
router.post('/login', session.login)


//ROTAS DE USUÁRIOS
router.post('/cadastro', user.createUser)
router.get('/cadastro', user.showListUsers)
router.get('/cadastro/:id', user.showUser)
router.patch('/cadastro/:id', user.updateUser)
router.delete('/cadastro/:id', user.deleteUser)


module.exports = router