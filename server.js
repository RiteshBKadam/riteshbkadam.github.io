require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to create a dynamic payment link
app.post('/create-payment-link', async (req, res) => {
  try {
    const { email, product } = req.body;

    if (product !== 'session' && !email) {
      return res.status(400).json({ error: "Email is required" });
    }

    let amount = Number(process.env.RAZORPAY_AMOUNT_PAISE) || 2900; // default 29 INR in paise
    let description = process.env.RAZORPAY_DESCRIPTION || "From Code To Impact eBook";

    if (product === 'session') {
      amount = 19900;
      description = "1:1 Virtual Call with Ritesh Kadam";
    }

    const currency = process.env.RAZORPAY_CURRENCY || "INR";

    const paymentLinkOptions = {
      amount: amount,
      currency: currency,
      description: description,
      notify: {
        email: false
      }
    };

    if (email) {
      paymentLinkOptions.customer = { email: email };
      paymentLinkOptions.notes = { buyer_email: email };
    }

    const paymentLink = await razorpay.paymentLink.create(paymentLinkOptions);

    // Return standard short URL
    res.json({ short_url: paymentLink.short_url });
  } catch (error) {
  console.log("===== ERROR START =====");

  console.log(error);

  if (error.error) {
    console.log("Razorpay Error:");
    console.log(error.error);
  }

  console.log("===== ERROR END =====");

  res.status(500).json({
    success: false,
    message: error.message,
    error: error.error || error
  });
}
});

// Basic check route
app.get('/', (req, res) => {
  res.send('Razorpay Payment Link Generator is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
