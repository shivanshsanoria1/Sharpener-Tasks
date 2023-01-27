const Razorpay = require('razorpay');
const dotenv = require('dotenv').config();

const Order = require('../models/order');

exports.purchasePremium = (req, res) => {
    try{
        var rzp = new Razorpay({ 
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const amount = 2500;
        rzp.orders.create({amount, currency:'INR'}, (err, order) => {
            if(err){
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid: order.id, status: 'PENDING'})
            .then(() => {
                res.status(201).json({order, key_id: rzp.key_id});
                return;
            })
            .catch((err) => {
                throw new Error(err);
            });
        });
    }catch(err){
        console.log(err);
        res.status(403).json({error: err, msg: 'something went wrong'});
    }
}

exports.updateTransactionStatus = async (req, res) => {
    try{
        const {payment_id, order_id} = req.body;
        const order = await Order.findOne({where: {orderid: order_id}});
        const promise1 = order.update({paymentid: payment_id, status: 'SUCCESSFUL'});
        const promise2 = req.user.update({isPremiumUser: true});
        Promise.all([promise1, promise2])
        .then(() => {
            return res.status(202).json({success: true, msg: 'Transaction Successful'});
        })
        .catch((err) => {
            throw new Error(err);
        })
    }catch(err){
        console.log(err);
        res.status(403).json({error: err, msg: 'something went wrong'});
    }
}