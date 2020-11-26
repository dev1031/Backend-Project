const express = require('express');
const router = express.Router();
const User = require('./../model/user.model');
const Orders = require('./../model/order.model')

router.get('/users-data', (req, res)=>{
    res.status(200).json({
        response : "This is response" 
    })
})

router.post('/create-user', async (req, res)=>{
    let user = req.body;
    let data =  new User({
        userId : user.userId,
        name : user.name
    });
    data.save()
    .then((result)=>{
         res.status(200).json({
             response: result
         })
    })
    .catch((error)=>{
        throw new Error(error)
    })
})

router.post('/create-order', async (req, res)=>{
    let order = req.body;
    let userId = await User.find({userId : order.userId});
    let data = await new Orders({
        orderId: order.orderId,
        userId: userId[0]._id,
        subtotal:order.subtotal
    })
    data.save()
    .then((result)=>{
        res.status(200).json({
            response: result
        })
    })
    .catch((error)=>{
        throw new Error(error)
    })
})

router.get('/total',async (req, res)=>{
    let data = await Orders.aggregate(
        [
            { 
                $group :{ _id:"$userId" , "noOfOrders":{ "$sum":1 }, 
                averageBillValue:{ $avg:"$subtotal" }}
            }
        ]
    )
    let arr= [];
    for(let i =0; i< data.length;i++){
        let user_info = {};
        let user = await User.findById(data[i]._id)
        user.noOfOrders = await data[i].noOfOrders;
        user.averageBillValue = await Math.floor(data[i].averageBillValue)
        user_info = {
            userId:user.userId,
            name:user.name,
            noOfOrders: data[i].noOfOrders,
            averageBillValue: Math.floor(data[i].averageBillValue)
        }
        arr.push(user_info)
    }
    let result = arr.sort((a,b)=> a.userId-b.userId)
    res.status(200).json({
        response: result
    })
})

router.put('/update-order', async (req, res)=>{
    let data = await Orders.aggregate(
        [
            { 
                $group :{ _id:"$userId" , "noOfOrders":{ "$sum":1  }}
            }
        ]
    )
    for(let i = 0 ; i<data.length ; i++){
        await User.findByIdAndUpdate(
            { _id:data[i]._id },
            { noOfOrders:data[i].noOfOrders },
            { returnOriginal: false }
        )
    }
    res.status(200).json({
        "success": true,
        "message":"Successfully updated"
    })
})

module.exports = router