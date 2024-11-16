import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/contacts'); 
      setContacts(response.data);  
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add new contact
  const addContact = async (contact) => {
    try {
      console.log("Contact data:", contact);  // Log contact data
      const response = await axios.post('http://localhost:5000/api/contacts', contact);
      setContacts((prevContacts) => [...prevContacts, response.data]);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error("Email already exists.");
      } else {
        console.error("Error adding contact:", error.message);
      }
    }
  };
  

  // Edit an existing contact
  const editContact = async (id, updatedContactData) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/contacts/${id}`, updatedContactData);
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact._id === id ? { ...contact, ...response.data } : contact
        )
      );
    } catch (error) {
      console.error('Error editing contact:', error.message);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts((prevContacts) => prevContacts.filter(contact => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, loading, addContact, editContact, deleteContact, fetchContacts }}>
      {children}
    </ContactContext.Provider>
  );
};
