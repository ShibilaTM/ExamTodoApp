const mongoose = require('mongoose')

const MONGO_DB_URL = process.env.MONGO_DB_URL

mongoose.connect(process.env.MONGO_DB_URL, {
    dbName: 'TodoAppDB'
})
    .then(() => {
        console.log('MongoDB connected Successfully')
    })
    .catch(error => {
        console.log('MongoDB coneection is not available' + error)
    })