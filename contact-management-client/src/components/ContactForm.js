import React, { useState, useContext } from 'react';
import { ContactContext } from '../context/ContactContext';
import { TextField, Button, Box } from '@mui/material';

const ContactForm = () => {
  const { addContact } = useContext(ContactContext);
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',  
    jobTitle: '', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContact(contact);
    setContact({ firstName: '', lastName: '', email: '', phoneNumber: '', company: '', jobTitle: '' }); // Reset fields
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
      <TextField
        label="First Name"
        name="firstName"
        value={contact.firstName}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={contact.lastName}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={contact.email}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={contact.phoneNumber}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Company"
        name="company"
        value={contact.company}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Job Title"
        name="jobTitle"
        value={contact.jobTitle}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Add Contact
      </Button>
    </Box>
  );
};

export default ContactForm;
