const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');


exports.addContact = [
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('phoneNumber').notEmpty().withMessage('Phone number is required'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newContact = new Contact(req.body);
      await newContact.save();
      console.log('New contact saved:', newContact);
      res.status(201).json(newContact); // Respond with the created contact
    } catch (error) {
      if (error.code === 11000) { 
        return res.status(409).json({ message: 'Email already exists' });
      }
      res.status(500).json({ message: error.message }); // Server error
    }
  }
];

// Get all contacts with pagination and sorting
exports.getContacts = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'firstName', order = 'asc' } = req.query;

    // Ensure limit doesn't exceed a reasonable value (e.g., 100)
    const maxLimit = 100;
    const contacts = await Contact.find()
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * Math.min(Number(limit), maxLimit)) // Adjusted pagination logic
      .limit(Math.min(Number(limit), maxLimit)); // Limit the max records per page

    const total = await Contact.countDocuments();
    res.json({ data: contacts, total }); // Return the contacts with the total count
  } catch (error) {
    res.status(500).json({ message: error.message }); // Internal server error
  }
};

// Update contact
exports.updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
    res.json(updatedContact); // Return the updated contact
  } catch (error) {
    res.status(400).json({ message: error.message }); // Bad request error
  }
};

// Delete contact
exports.deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' }); // Return success message
  } catch (error) {
    console.error("Error in addContact:", error);
    res.status(500).json({ message: error.message }); 
  }
};
