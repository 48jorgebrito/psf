const express = require('express')
const router = express.Router()
const user = require('../controllers/usersController')

router.post('/cadastro', user.createUser)
router.get('/cadastro', user.showListUsers)
router.get('/cadastro/:id', user.showUser)
router.patch('/cadastro/:id', user.updateUser)
router.delete('/cadastro/:id', user.deleteUser)


module.exports = router