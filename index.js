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
const bcrypt=require("bcryptjs");
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const dbConnect = require("./config/db"); // Import your database connection function
const Payment = require("./models/payment");
const gupshup = require('@api/gupshup');
const Event = require("./models/Event");
const cron =require('node-cron'); // Import your Event model
const Admin = require("./models/Admin");
const jwt = require("jsonwebtoken"); 
const whatsapp=require('./Routes/WhatsApp.routes')// Import JWT for authentication
 // Import your Payment model
 const BookEvent =require("./models/Event1")
 const GitaSessionParticipant=require('./models/Admin.Session.model') 

const app = express();
app.use(cors({
  origin: ["http://localhost:3000","https://gita-sparks-git-main-sivabalajieevana-12s-projects.vercel.app","https://gita-sparks.vercel.app","https://session-beryl.vercel.app","https://admin-panel-iota-nine.vercel.app","https://admin-panel-git-main-sivabalajieevana-12s-projects.vercel.app"], // Adjust this to your frontend URL
  methods: ["GET", "POST","PUT","PATCH","DELETE"],
}));
app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
dbConnect();
app.use('/book',whatsapp);
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
    // const messsage = axios.get("https://message-api-s9pm.onrender.com/siva?phoneNumber="+normalizedNumber)
    // if(messsage.status !== 200){
    //   console.error("Error sending WhatsApp message:", messsage.data);
    // }
    

        gupshup.sendingTextTemplate({
    template: {
      id: '3439dc99-4784-4733-9038-f810b98df077',
      //f69893f8-f84f-4c37-a744-c8f6713afce5
      params: [newPayment.name,"https://chat.whatsapp.com/BgKZOANIvI0JSuBWStpyf2"]
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
    console.log("WhatsApp message sent successfully:", data);
    res.status(200);
    // res.status(200).json({ status: "success", message: "Payment verified and user registered" });
  })
  .catch(err =>{
    console.error("Error sending WhatsApp message:", err.response?.data || err);
    res.status(500).json({ status: "error", message: "Failed to send WhatsApp message" });
  })
  // gupshup.sendingTextTemplate({
  //   template: {
  //     id: '3439dc99-4784-4733-9038-f810b98df077',
  //     //f69893f8-f84f-4c37-a744-c8f6713afce5
  //     params: [newPayment.name,"https://chat.whatsapp.com/BgKZOANIvI0JSuBWStpyf2"]
  //   },
  //   'src.name': '4KoeJVChI420QyWVhAW1kE7L',  // Replace with actual App Name (not App ID)
  //   destination: normalizedNumber,
  //   source: '917075176108',//917075176108
  //   // postbackTexts: [
  //   //   { index: 1, text: "hello " }
  //   // ]
  // }, {
  //   apikey:'zbut4tsg1ouor2jks4umy1d92salxm38'
  // })
  // .then(({ data }) => {
  //   console.log(data);
  //   res.status(200);
  // })
  // .catch(err => {
  //   console.error(err.response?.data || err);
  //   res.status(500);
  // });
//   gupshup.sendingTextTemplate({
//   template: {"id":"3439dc99-4784-4733-9038-f810b98df077","params":[`${formdata.name}`,"https://llasjkjkjjksd.com"]},
//   source: '917075176108',
//   'src.name': 'Production',
//   destination: '919542458131',
//   channel: 'whatsapp'
// }, {
//   apikey: 'zbut4tsg1ouor2jks4umy1d92salxm38'
// })
//   .then(({ data }) => console.log(data))
//   .catch(err => console.error(err));

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
app.get("/users", async (req, res) => {
  try {
    const users = await Payment.find({ paymentSuccess: true });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch users" });
  }
});
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by date ascending
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch events" });
  }
});
app.get("/event/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ status: "error", message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch event" });
  }
}
);
app.delete("/event/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ status: "error", message: "Event not found" });
    }
    res.status(200).json({ status: "success", message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ status: "error", message: "Failed to delete event" });
  }
});
app.put("/event/:id", async (req, res) => {
  const { id } = req.params;
  const { name, date, time, linkBox } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, date: new Date(date), time, linkBox },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ status: "error", message: "Event not found" });
    }

    res.status(200).json({ status: "success", message: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ status: "error", message: "Failed to update event" });
  }
});
const getEventDateTime = (event) => {
  const [hours, minutes] = event.time.split(':').map(Number);
  const eventDateTime = new Date(event.date);
  eventDateTime.setHours(hours);
  eventDateTime.setMinutes(minutes);
  eventDateTime.setSeconds(0);
  return eventDateTime;
};

// Check for reminders
cron.schedule('* * * * *', async () => {
  console.log('⏰ Checking for reminders...');

  const now = new Date();
  const events = await Event.find();
  console.log(`Found ${events.length} events`);

  events.forEach(event => {
    const eventTime = getEventDateTime(event);
    const timeDiff = eventTime - now;

    const reminders = [
      { label: '1 day before', offset: 24 * 60 * 60 * 1000 },
      { label: '1 hour before', offset: 60 * 60 * 1000 },
      { label: '30 minutes before', offset: 30 * 60 * 1000 },
      { label: '5 minutes before', offset: 5 * 60 * 1000 },
    ];

    reminders.forEach(({ label, offset }) => {
      const reminderWindowStart = offset - 60 * 1000; // 1 min window
      const reminderWindowEnd = offset;

      if (timeDiff <= reminderWindowEnd && timeDiff > reminderWindowStart) {
        const users = Payment.find({ paymentSuccess: true });
        users.then(users => {
          users.forEach(user => {
            const normalizedNumber = user.whatsappNumber;
            console.log(`Sending ${label} reminder to ${user.name} (${normalizedNumber}) for event "${event.name}"`);
            gupshup.sendingTextTemplate({
              template: {
                id: 'c2b3766f-c352-4a98-a0be-dcc369b2d8bc',
                params: [user.name, event.name, event.date.toLocaleDateString(), event.time, event.linkBox]
              },
              'src.name': '4KoeJVChI420QyWVhAW1kE7L',
              destination: normalizedNumber,
              source: '917075176108',
            }, {
              apikey: 'zbut4tsg1ouor2jks4umy1d92salxm38'
            })
            .then(({ data }) => {
              console.log(`Notification sent to ${user.name}:`, data);
            })
            .catch(err => {
              console.error(`Error sending notification to ${user.name}:`, err.response?.data || err);
            });
          });
        }).catch(err => {
          console.error("Error fetching users:", err);
        });
        console.log(`✅ Sent "${label}" reminder for "${event.name}"`);
      }
    });
  });
});

app.delete("/payment",async (req, res) => {
  try {
    const data = await Event.deleteMany({});
    res.status(200).json({ status: "success", message: "All events deleted successfully",data });
  } catch (error) {
    console.error("Error deleting payments:", error);
    res.status(500).json({ status: "error", message: "Failed to delete payments" });
  }
}
);
mongoose.connection.once("open",()=>{
  console.log("Connected to MongoDB");
})

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new Admin({ username, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully.");
  } catch (err) {
    res.status(400).send("Error registering user.");
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Admin.findOne({ username });
  if (!user) return res.status(400).send("Invalid credentials.");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials.");
  console.log("User logged in",process.env.JWT_SECRET);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});
cron.schedule('* * * * *', async () => {
  console.log('⏰ Checking Book Events for reminders...');

  const now = new Date();
  const events = await BookEvent.find();
  const users = await GitaSessionParticipant.find({ interestedInGitaSession: true }); // or whatever condition
  console.log(`Found ${events.length} book events`);

  const reminders = [
    { label: '1 day before', offset: 24 * 60 * 60 * 1000 },
    { label: '1 hour before', offset: 60 * 60 * 1000 },
    { label: '30 minutes before', offset: 30 * 60 * 1000 },
    { label: '5 minutes before', offset: 5 * 60 * 1000 },
  ];

  for (const event of events) {
    const timeDiff = new Date(event.eventDate) - now;

    for (const { label, offset } of reminders) {
      const windowStart = offset - 60 * 1000;
      const windowEnd = offset;

      if (timeDiff <= windowEnd && timeDiff > windowStart) {
        console.log(`📢 Sending "${label}" reminder for event "${event.title}"`);

        for (const user of users) {
          try {
            await gupshup.sendingTextTemplate({
              template: {
                id: 'c2b3766f-c352-4a98-a0be-dcc369b2d8bc',
                params: [
                  user.name,
                  event.title,
                  new Date(event.eventDate).toLocaleDateString(),
                  new Date(event.eventDate).toLocaleTimeString(),
                  event.link
                ]
              },
              'src.name': 'Production',
              destination: user.whatsappNumber,
              source: '917075176108',
            }, {
              apikey: 'zbut4tsg1ouor2jks4umy1d92salxm38'
            });

            console.log(`✅ Sent reminder to ${user.name}`);
          } catch (err) {
            console.error(`❌ Failed to send to ${user.name}:`, err.response?.data || err);
          }
        }
      }
    }
  }
});
