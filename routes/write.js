const {Router} = require('express')
const {insert,update} = require('../controllers/write/write') 


const router = Router()

router.post('/',insert)

router.put('/',update)

module.exports = router

