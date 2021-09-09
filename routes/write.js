const {Router} = require('express')
const {insert,update,deleteDoc} = require('../controllers/write/write') 


const router = Router()

router.post('/',insert)

router.put('/',update)

router.delete('/',deleteDoc)

module.exports = router

