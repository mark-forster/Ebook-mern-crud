const mongoose = require('mongoose')

const BookSchema= new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        slug:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        image:{
            type:String,
        },
        category:{
            type:Array,
            default:[]
        },
        created_at:{
            type:Date,
            default:Date.now()
        }
})

module.exports= mongoose.model('Book',BookSchema);