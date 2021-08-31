const router = require('express').Router()
const {
    getAllCollections,
    find,
    findOne,
    findById
} = require('../controllers/crud/read')

const {
    insertOne,
    insertMany
} = require('../controllers/crud/write')


//routes to read from db

//get a list of all collections
router.get('/collections',getAllCollections)

//get all documents in a collection
router.get('/:collection/find',find)

//get a single document in a collection
router.get('/:collection/find-one',findOne)

//find an object by id
router.get('/:collection/find-by-id/:id',findById)





//routes to write to db

//create a new document in a collection
router.post('/:collection/insert-one',insertOne)

//creates multiple new documents
router.post('/:collection/insert-many',insertMany)


module.exports = router