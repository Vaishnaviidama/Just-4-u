const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
    usn:{
        type:String,
        required:true,
        minLength:10,
        maxLength:10,
        unique:true,
        validate(value){
            if(validator.isEmpty(value)){
                throw new Error('Please enter your usn!')
            }
            if(!validator.isAlphanumeric(value)){
                throw new Error('Please enter a valid usn!')
            }
            if(!validator.contains(value.toLowerCase(), "1bm")){
                throw new Error('Please enter a valid usn!')
            }
        }
    },
    password: {
        type:String,
        required:true
    },
    confirmPassword: {
        type:String,
        required:true
    }
    


})

const Register  = new mongoose.model("Register", userSchema);

module.exports = Register;
