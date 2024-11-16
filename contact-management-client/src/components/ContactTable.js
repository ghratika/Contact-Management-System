import React, { useState, useEffect, useContext } from 'react';
import { ContactContext } from '../context/ContactContext';  
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const ContactTable = () => {
    const { contacts, loading, fetchContacts, editContact, deleteContact } = useContext(ContactContext);
    const [open, setOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      company: '',
      jobTitle: '',
    });
  
    useEffect(() => {
      fetchContacts();
    }, [fetchContacts]);
  
    const handleOpen = (contact) => {
      setSelectedContact(contact);
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        company: contact.company,
        jobTitle: contact.jobTitle,
      });
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
    };
  
    const handleSubmit = () => {
      if (selectedContact) {
        editContact(selectedContact._id, formData);
        handleClose();
      }
    };
  
    const handleDelete = (id) => {
      deleteContact(id);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    return (
      <>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              ) : (
                Array.isArray(contacts) && contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell>{contact.firstName}</TableCell>
                    <TableCell>{contact.lastName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" onClick={() => handleOpen(contact)}>
                        Edit
                      </Button>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(contact._id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
  
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Contact</DialogTitle>
          <DialogContent>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">Cancel</Button>
            <Button onClick={handleSubmit} color="primary">Save Changes</Button>
          </DialogActions>
        </Dialog>
      </>
    );
};

export default ContactTable;
