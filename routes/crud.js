const router = require('express').Router()
const {
    getAllCollections,
    find,
    findOne
} = require('../controllers/crud/read')

const {
    insertOne
} = require('../controllers/crud/write')


//routes to read from db

//get a list of all collections
router.get('/collections',getAllCollections)

//get all documents in a collection
router.get('/:collection/find',find)

//get a single document in a collection
router.get('/:collection/find-one',findOne)





//routes to write to db

//create a new document in a collection
router.post('/:collection/insert-one',insertOne)


module.exports = router