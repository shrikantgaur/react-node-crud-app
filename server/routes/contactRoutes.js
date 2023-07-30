// routes/contactRoutes.js
const express = require("express");
const Contact = require("../models/contact");

const router = express.Router();

// Create a new contact
router.post("/contacts", async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const contact = new Contact({ name, email, password, phone, address });
    const newContact = await contact.save();
    res.json(newContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all contacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific contact
router.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a contact
router.put("/contacts/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!updatedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a contact
router.delete("/contacts/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndRemove(req.params.id);
    if (!deletedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.json(deletedContact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Insert dummy record
router.post("/insert-dummy", async (req, res) => {
    try {
      const dummyData = require("../dummy-data.json");
      const { name, email } = dummyData;
      const contact = new Contact({ name, email });
      const newContact = await contact.save();
      res.json(newContact);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })

module.exports = router;
