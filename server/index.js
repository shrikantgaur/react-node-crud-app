// index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const contactRoutes = require("./routes/contactRoutes");
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

// Parse incoming JSON data
app.use(bodyParser.json());

// MongoDB connection
// MongoDB connection with credentials
const MONGODB_URI = "mongodb://admin:password@localhost:27017/admin"; // Replace 'username', 'password', and 'mydatabase' with your credentials and database name
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// const MONGODB_URI = "mongodb://localhost:27017/mydatabase"; // Replace 'mydatabase' with your database name
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once("open", () => {
//   console.log("Connected to MongoDB");
// });

// Mount contact routes
app.use("/api", contactRoutes);

// Route to insert a dummy record
app.post("/api/insert-dummy", async (req, res) => {
  try {
    const { name, email } = req.body;
    const contact = new Contact({ name, email });
    const newContact = await contact.save();
    res.json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
