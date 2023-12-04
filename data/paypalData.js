
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require("dotenv").config()

  
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET,BASE } = process.env;


  
//function to generate accesstoken
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${BASE}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};
  







const createOrder = async (cart) => {
  // use the cart information passed from the front-end to calculate the purchase unit details
  console.log(
    "shopping cart information passed from the frontend createOrder() callback:",
    cart,
  );
 //let orderDetails = processCart(cart);
  
  const accessToken = await generateAccessToken();
  const url = `${BASE}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    payer: {
      name: {
         given_name: "Kevin",
         surname: "Dsa"
      },
      address: {
         "address_line_1": "123 Main St.",
         "admin_area_2": "Anytown",
         "admin_area_1": "CA",
         "postal_code": "12345",
         "country_code": "US"
      }
    },
    purchase_units: [
      { 
        reference_id: "RF123456",
        description: "Description of PU",
        invoice_id: "INV_202302011234",
        amount: {
          currency_code: "USD",
          value: "100.30",
          breakdown: {
             item_total: {
                currency_code: "USD",
                value: "90.20"
             },
             tax_total: {
                currency_code: "USD",
                value: "10.10"
             },
             shipping: {
                currency_code: "USD",
                value: "10.00"
             },
             discount: {
                currency_code: "USD",
                value: "10.00"
             }
          }
       },
       items: [
        {
           name: "Item1",
           description: "Description of Item1",
           sku: "SKU - 0",
           url: "http: //example.com",
           unit_amount: {
              "currency_code": "USD",
              "value": "45.10"
           },
           tax: {
              currency_code: "USD",
              value: "5.05"
           },
           quantity: "2",
           category: "PHYSICAL_GOODS"
        }
        ],
        shipping: {
        address: {
           address_line_1: "123 Main St.",
           admin_area_2: "Anytown",
           admin_area_1: "CA",
           postal_code: "12345",
           country_code: "US"
        }
     }
      },
    ],

  };
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  
  return handleResponse(response);
};





const captureOrder = async (orderID) => {
  const accessToken = await generateAccessToken();
  const url = `${BASE}/v2/checkout/orders/${orderID}/capture`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });
  
  return handleResponse(response);
};
  



//Helper function
async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
  


module.exports = {
  captureOrder,
  createOrder,
 
}

  
