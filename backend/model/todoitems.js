const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoData = new Schema({
    addyourtask:{
        type:String,
        required:true
    }
})
const todo= mongoose.model('todolist',todoData)
module.exports = todo