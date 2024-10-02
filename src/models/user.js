const mongoose = require("mongoose")
const validator = require("validator")


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength:4,
        maxlength:20
    },
    lastName: 
    {
        type: String
    },
    emailId :{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value)
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min:18
    },
    gender:  {
        type: String,
        validate(value) {
            if(!["male","female","others"].includes(value)){
                throw new Errror("Gener is not valid")
            }
        }
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

module.exports = User