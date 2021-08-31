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

const {
    deleteMany,
    deleteOne,
    findByIdAndDelete
} = require('../controllers/crud/delete')

const {
    findOneAndUpdate,
    findByIdAndUpdate,
    findManyAndUpdate
} = require('../controllers/crud/update')


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



//routes to delete from db

//delete many
router.delete('/:collection/delete-many',deleteMany)

//delete one
router.delete('/:collection/delete-one',deleteOne)

//delete by Id
router.delete('/:collection/delete-by-id/:id',findByIdAndDelete)




//routes to update a db

//update many
router.patch('/:collection/update-many',findManyAndUpdate)

//update one
router.patch('/:collection/update-one',findOneAndUpdate)

//update by Id
router.patch('/:collection/update-by-id/:id',findByIdAndUpdate)

module.exports = router