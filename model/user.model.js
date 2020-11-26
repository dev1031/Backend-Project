const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId : {
        type : Number,
        required: true
    },
    name :{
        type : String,
        required: true
    },
    noOfOrders:{
        type: Number,
        default : 0
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;