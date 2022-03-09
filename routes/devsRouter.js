const express = require('express')
const router = express.Router()

const DevsController = require('../Controller/DevsController')

//helper
const checkAuth = require('../helpers/auth').checkAuth
const teste = require('../helpers/auth').teste

router.get('/', DevsController.showDevs)
router.get('/profile', checkAuth,DevsController.profile)
router.get('/add', checkAuth, DevsController.create)
router.post('/add', checkAuth, DevsController.createPost) 
router.get('/edit/:id', teste, checkAuth, DevsController.edit)
router.post('/edit', checkAuth, DevsController.editPost)
router.get('/dev/:id/:UserId', DevsController.devs)
router.get('/error', checkAuth, DevsController.teste)

module.exports = router