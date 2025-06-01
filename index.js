// require("dotenv").config();
// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const razorpayInstance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // Create Order Route
// app.post("/create-order", async (req, res) => {
//   const options = {
//     amount: req.body.amount, // amount in paise
//     currency: "INR",
//     receipt: "receipt#1",
//   };
//   try {
//     const order = await razorpayInstance.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     console.error("Error creating order:", error);
//     // res.status(500).send("Internal Server Error");
//     res.status(500).json({ status: "error", message: "Internal Server Error" });

//   }
// });

// // Verify Payment Route
// app.post("/verify-payment", (req, res) => {
//   // const { orderId, paymentId, signature } = req.body;
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   const generatedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//     .digest("hex");

//   if (generatedSignature === razorpay_signature) {
//     res.json({ status: "success", message: "Payment verified successfully" });
//   } else {
//     console.log("Verification Failed");
//     res.status(400).json({ status: "failure", message: "Payment verification failed" });
//   }
// });


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require("dotenv").config(); // Load .env

const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConnect = require("./config/db"); // Import your database connection function
const Payment = require("./models/payment");
const gupshup = require('@api/gupshup');
const Event = require("./models/Event"); // Import your Event model
 // Import your Payment model

const app = express();
app.use(cors({
  origin: ["http://localhost:3000","https://gita-sparks-git-main-sivabalajieevana-12s-projects.vercel.app","https://gita-sparks.vercel.app"], // Adjust this to your frontend URL
  methods: ["GET", "POST"],
}));
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
dbConnect();
// Route to create order
app.post("/create-order", async (req, res) => {
  console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);
  
  const { amount } = req.body;

  const options = {
    amount: amount, // in paise (₹99 = 9900 paise)
    currency: "INR",
    receipt: "receipt#1",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ status: "error", message: "Failed to create order" });
  }
});

// Route to verify payment

app.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    formData,
  } = req.body

  // Step 1: Verify Signature
  const crypto = require("crypto")
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id)
  const generated_signature = hmac.digest("hex")

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ status: "fail", message: "Payment verification failed" })
  }

  try {
    // Step 2: Save user + payment details in DB
    const normalizedNumber = "91"+formData.whatsappNumber
    const newPayment = new Payment({
      name: formData.name,
      whatsappNumber: normalizedNumber,
      email: formData.email,
      area: formData.areaOfResidence,
      collegeName: formData.collegeName,
      courseAndYear: formData.courseYear,
      gender: formData.gender,
      dayScholarOrHostler: formData.dayScholarHostler === "dayscholar" ? "Day Scholar" : "Hostler",
      amount: parseFloat(formData.amount),

      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      paymentSuccess: true,
    })

    await newPayment.save()
    gupshup.postMsg({
  message: '{"type":"text","text":"Hare krishna! Your payment has been successfully verified. Thank you for your support!"}',
  channel: 'whatsapp',
  source: 917075176108,
  destination: normalizedNumber,
  'src.name': 'Production',
  disablePreview: false
}, {
  apikey: 'zbut4tsg1ouor2jks4umy1d92salxm38'
})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));
        gupshup.sendingTextTemplate({
    template: {
      id: 'cb7c7f4d-0bd3-4719-b881-ac82c2626946',
      //f69893f8-f84f-4c37-a744-c8f6713afce5
      params: [newPayment.name]
    },
    'src.name': 'Production',  // Replace with actual App Name (not App ID)
    destination: normalizedNumber,
    source: '917075176108',//917075176108
    // postbackTexts: [
    //   { index: 1, text: "hello " }
    // ]
  }, {
    apikey:'zbut4tsg1ouor2jks4umy1d92salxm38'
  })
        gupshup.sendingTextTemplate({
    template: {
      id: '21e27d1e-1e53-4e01-868b-fa107d7b4516',
      //f69893f8-f84f-4c37-a744-c8f6713afce5
      params: []
    },
    'src.name': 'Production',  // Replace with actual App Name (not App ID)
    destination: normalizedNumber,
    source: '917075176108',//917075176108
    // postbackTexts: [
    //   { index: 1, text: "hello " }
    // ]
  }, {
    apikey:'zbut4tsg1ouor2jks4umy1d92salxm38'
  })
  .then(({ data }) => {
    console.log(data);
    res.status(200);
  })
  .catch(err => {
    console.error(err.response?.data || err);
    res.status(500);
  });

    res.json({ status: "success", message: "Payment verified and user registered" })
  } catch (err) {
    console.error("Error saving payment to DB:", err)
    res.status(500).json({ status: "error", message: "User registration failed" })
  }
})
app.post("/event/register",async (req,res)=>{
  const {name,date,time,linkBox}=req.body;
  try {
    const newEvent = new Event({
      name,
      date: new Date(date), // Ensure date is stored as a Date object
      time,
      linkBox
    });
    await newEvent.save();
    const eventDate = new Date(date);
    const users = await Payment.find({ paymentSuccess: true });
    for(const user of users){
      // if(user.whatsappNumber.length==10){
      //   user.whatsappNumber = "91"+user.whatsappNumber;
      // }
      console.log(user.whatsappNumber);
       gupshup.sendingTextTemplate({
    template: {
      id: 'fbd81ee5-667f-42f2-a40d-25310247cf61',
      //f69893f8-f84f-4c37-a744-c8f6713afce5
      params: [user.name,name,eventDate.toLocaleDateString(),time,linkBox]
    },
    'src.name': '4KoeJVChI420QyWVhAW1kE7L',  // Replace with actual App Name (not App ID)
    destination: user.whatsappNumber,
    source: '917075176108',//917075176108
    // postbackTexts: [
    //   { index: 1, text: "hello " }
    // ]
  }, {
    apikey: 'zbut4tsg1ouor2jks4umy1d92salxm38'
  })
      .then(({ data }) => {
        console.log(`Notification sent to ${user.name}:`, data);
      })
      .catch(err => {
        console.error(`Error sending notification to ${user.name}:`, err.response?.data || err);
      });
    }
    res.status(201).json({ status: "success", message: "Event registered successfully" });
  } catch (error) {
    console.error("Error registering event:", error);
    res.status(500).json({ status: "error", message: "Failed to register event" });
  }
})
mongoose.connection.once("open",()=>{
  console.log("Connected to MongoDB");
})

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
