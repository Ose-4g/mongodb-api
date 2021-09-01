const router = require('express').Router()
const login = require('../controllers/auth/login')
const verifyToken = require('../controllers/auth/verify')

//login route
router.post('/login', login)


//verify token 
router.post('/verify/:token',verifyToken)
module.exports = router