const {Router} = require('express')
const read = require('../controllers/read/read')

const router = Router()

router.get('/:plugin_id/:collection_name/:organization_id',read)

module.exports = router