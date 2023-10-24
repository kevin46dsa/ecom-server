
const router = require('express').Router();
const stripeDataFunction = require("../data/stripe")

// Post route to charge customer according to their selection

router.post("/create-checkout-session", async (req, res) => {
    try {

        // Data validation in the routes


        // Calling Data function to process request 

        const session = await stripeDataFunction.stripeCheckout()
        
        // Serving the URL of the session returned by Stripe  
        //res.json({ url: session.url })
        res.json({ url: session.url})
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
  })

  module.exports = router;