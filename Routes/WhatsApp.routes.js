const {register,registerEvent,RegisterEvent, getEvent, updateEvent, deleteEvent}=require('../Controller/Whatsapp.Controller');
const Book = require('../models/Admin.Books.model'); // adjust path as needed
const express = require('express');
const Event = require('../models/Event1');
const GitaSessionParticipant = require('../models/Admin.Session.model'); // adjust path as needed
const router = express.Router();
router.post('/register',register);
router.post('/registerEvent',registerEvent);
router.get('/registerEvents',RegisterEvent);
router.get('/event/:id',getEvent)
router.put('/event/:id',updateEvent)
router.delete('/event/:id',deleteEvent)
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 }); // sort by date ascending
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
});
// router.delete("event/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deleted = await Event.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ message: "Event not found" });
//     }
//     res.status(200).json({ message: "Event deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete event", error });
//   }
// });
router.get('/users', async (req, res) => {
  try {
    const users = await GitaSessionParticipant.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/deleteAll',async(req,res)=>{
  try {
    const deleted = await GitaSessionParticipant.deleteMany();
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error });
  }
})
router.get('/getAllBooks', async (rea,res)=>{
const allBooks = await Book.find();
res.status(200).json(allBooks);
})
router.get('/getBook/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
);
router.delete('/deleteBook/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/addBook', async (req, res) => {
  const { title} = req.body;
  try {
    const newBook = new Book({ title });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports =router;
