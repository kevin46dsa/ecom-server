const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)


async function stripeCheckout(){
    
    return {url:"https://github.com/kevin46dsa/CS554-TeamMavericks-project/blob/master/server/data/imagemagic.js"}
    
    /*
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items.map(item => {
          const storeItem = storeItems.get(item.id)
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInCents,
            },
            quantity: item.quantity,
          }
        }),
        success_url: `${process.env.CLIENT_URL}/success.html`,
        cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      })
      res.json({ url: session.url })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
    */
}

module.exports = {
    stripeCheckout,
   
}