const mongoose= require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
      type:Number,
      require:true
    }
})

module.exports= mongoose.model('users',userSchema)