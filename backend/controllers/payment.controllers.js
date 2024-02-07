import catchAsyncError from '../middlewares/catchAsyncError.js';
import stripe from 'stripe';
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

export const processPayment  = catchAsyncError(async(req, res, next) => {
    const paymentIntent = await stripeInstance.paymentIntents.create({
        amount: req.body.amount,
        currency: "usd",
        description: "TEST PAYMENT",
        metadata: { integration_check: "accept_payment"},
        shipping: req.body.shipping
    })

    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
})

export const sendStripeApi  = catchAsyncError(async(req, res, next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })
})