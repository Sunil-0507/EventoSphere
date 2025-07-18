const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Ticket = require("./models/Ticket");

const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "bsbsfbrnsftentwnnwnwn";

// Ensure uploads folder exists
if (!fs.existsSync('./uploads')) {
   fs.mkdirSync('./uploads');
}

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(cors({
   credentials: true,
   origin: "http://localhost:5173",
}));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB connected successfully"))
   .catch((err) => console.error("MongoDB connection failed:", err));

// File Upload Setup
const storage = multer.diskStorage({
   destination: (req, file, cb) => cb(null, "uploads/"),
   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Models
const eventSchema = new mongoose.Schema({
   owner: { type: String, required: false },
   title: { type: String, required: true },
   optional: { type: String, required: false },
   description: { type: String, required: true },
   organizedBy: { type: String, required: true },
   eventDate: { type: Date, required: true },
   eventTime: { type: String, required: true },
   location: { type: String, required: true },
   Participants: { type: Number, default: 0 },
   Count: { type: Number, default: 0 },
   Income: { type: Number, default: 0 },
   ticketPrice: { type: Number, required: true },
   Quantity: { type: Number, default: 0 },
   image: { type: String, required: false },
   likes: { type: Number, default: 0 },
   Comment: { type: [String], default: [] },
});
const Event = mongoose.model("Event", eventSchema);

// Routes
app.get("/test", (req, res) => {
   res.json("test ok");
});

// Register
app.post("/register", async (req, res) => {
   const { name, email, password } = req.body;

   const nameRegex = /^[A-Za-z ]{3,}$/;
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{6,})/;

   if (!name || !email || !password) {
      return res.status(422).json({ error: "All fields are required" });
   }

   if (!nameRegex.test(name.trim())) {
      return res.status(422).json({ error: "Name must be at least 3 letters and only alphabets/spaces" });
   }

   if (!emailRegex.test(email.trim())) {
      return res.status(422).json({ error: "Invalid email format" });
   }

   if (!passwordRegex.test(password)) {
      return res.status(422).json({ error: "Password must be at least 6 characters, include one uppercase and one special character" });
   }

   try {
      const userDoc = await UserModel.create({
         name,
         email,
         password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
   } catch (e) {
      console.error("Registration error:", e);
      res.status(422).json({ error: "User already exists or invalid data", details: e.message });
   }
});

// Login
app.post("/login", async (req, res) => {
   const { email, password } = req.body;
   const userDoc = await UserModel.findOne({ email });

   if (!userDoc) return res.status(404).json({ error: "User not found" });

   const passOk = bcrypt.compareSync(password, userDoc.password);
   if (!passOk) return res.status(401).json({ error: "Invalid password" });

   jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
      if (err) return res.status(500).json({ error: "Token generation failed" });
      res.cookie("token", token).json(userDoc);
   });
});

// Profile
app.get("/profile", (req, res) => {
   const { token } = req.cookies;
   if (!token) return res.json(null);

   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await UserModel.findById(userData.id);
      res.json({ name, email, _id });
   });
});

// Logout
app.post("/logout", (req, res) => {
   res.cookie("token", "").json(true);
});

// Create Event
app.post("/createEvent", upload.single("image"), async (req, res) => {
   try {
      const eventData = {
         ...req.body,
         eventDate: new Date(req.body.eventDate),
         image: req.file ? req.file.path : "",
      };

      const newEvent = new Event(eventData);
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
   } catch (error) {
      console.error("Create Event Error:", error);
      res.status(500).json({ error: "Failed to save the event", details: error.message });
   }
});

// Get All Events
app.get("/events", async (req, res) => {
   try {
      const events = await Event.find();
      res.status(200).json(events);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
   }
});

// Get One Event
app.get("/event/:id", async (req, res) => {
   try {
      const event = await Event.findById(req.params.id);
      res.json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch event" });
   }
});

// Like Event
app.post("/event/:eventId", async (req, res) => {
   try {
      const event = await Event.findById(req.params.eventId);
      if (!event) return res.status(404).json({ message: "Event not found" });

      event.likes += 1;
      const updatedEvent = await event.save();
      res.json(updatedEvent);
   } catch (error) {
      res.status(500).json({ message: "Error liking event" });
   }
});

// Order Summary
app.get("/event/:id/ordersummary", async (req, res) => {
   try {
      const event = await Event.findById(req.params.id);
      res.json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch order summary" });
   }
});

app.get("/event/:id/ordersummary/paymentsummary", async (req, res) => {
   try {
      const event = await Event.findById(req.params.id);
      res.json(event);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch payment summary" });
   }
});

// Ticket Endpoints
app.post("/tickets", async (req, res) => {
   try {
      const ticketDetails = req.body;
      const newTicket = new Ticket(ticketDetails);
      await newTicket.save();
      res.status(201).json({ ticket: newTicket });
   } catch (error) {
      res.status(500).json({ error: "Failed to create ticket" });
   }
});

app.get("/tickets/:id", async (req, res) => {
   try {
      const tickets = await Ticket.find();
      res.json(tickets);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch tickets" });
   }
});

app.get("/tickets/user/:userId", async (req, res) => {
   try {
      const tickets = await Ticket.find({ userid: req.params.userId });
      res.json(tickets);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch user tickets" });
   }
});

app.delete("/tickets/:id", async (req, res) => {
   try {
      await Ticket.findByIdAndDelete(req.params.id);
      res.status(204).send();
   } catch (error) {
      res.status(500).json({ error: "Failed to delete ticket" });
   }
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

// ✅ Backend Admin Routes - Insert at the bottom of index.js

// Admin login with fixed credentials
app.post("/admin/login", (req, res) => {
   const { email, password } = req.body;
   if (email === "admin@gmail.com" && password === "Admin@123") {
      return res.status(200).json({ message: "Admin login successful" });
   } else {
      return res.status(401).json({ error: "Invalid admin credentials" });
   }
});

// Get all users
app.get("/admin/users", async (req, res) => {
   try {
      const users = await UserModel.find();
      res.json(users);
   } catch (err) {
      res.status(500).json({ error: "Failed to fetch users" });
   }
});

// Delete user by ID
app.delete("/admin/users/:id", async (req, res) => {
   try {
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(204).send();
   } catch (err) {
      res.status(500).json({ error: "Failed to delete user" });
   }
});

// Get all events
app.get("/events", async (req, res) => {
   try {
      const events = await Event.find();
      res.status(200).json(events);
   } catch (error) {
      res.status(500).json({ error: "Failed to fetch events" });
   }
});

// Delete event by ID
app.delete("/admin/events/:id", async (req, res) => {
   try {
      await Event.findByIdAndDelete(req.params.id);
      res.status(204).send();
   } catch (err) {
      res.status(500).json({ error: "Failed to delete event" });
   }
});
