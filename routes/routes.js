const express = require('express')

const router = express.Router()

//imported routes
const userRoutesController = require('../controllers/users')


router
.get('/api/', (req, res) =>{
    res.send('Welcome to the Let Off Steam API.')
})
.use('/api/users/', userRoutesController)

module.exports = router