const express = require('express');
const { addContact, getContacts, updateContact, deleteContact } = require('../controllers/contactController');

const router = express.Router();

router.post('/', addContact);
router.get('/', getContacts);
router.put('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
