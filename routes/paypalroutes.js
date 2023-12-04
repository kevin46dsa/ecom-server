const router = require('express').Router();
const paypalData = require("../data/paypalData")

router.post("/api/orders", async (req, res) => {
    try {
      // use the cart information passed from the front-end to calculate the order amount detals
      const { cart } = req.body;
      const { jsonResponse, httpStatusCode } = await paypalData.createOrder(cart);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to create order." });
    }
  });
    
  router.post("/api/orders/:orderID/capture", async (req, res) => {
    try {
      const { orderID } = req.params;
      const { jsonResponse, httpStatusCode } = await paypalData.captureOrder(orderID);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create order:", error);
      res.status(500).json({ error: "Failed to capture order." });
    }
  });




  module.exports = router;