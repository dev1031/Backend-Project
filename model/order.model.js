const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId:{
        type: Number ,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId , 
        ref:'User', 
        required: true 
    },
    subtotal :{
        type: Number,
        required: true
    },
    
    date:{
        type:Date,
        default: Date.now
    }
})

const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders