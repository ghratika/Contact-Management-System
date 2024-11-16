import React from 'react';
import ContactForm from './components/ContactForm';
import ContactTable from './components/ContactTable';
import { ContactProvider } from './context/ContactContext';
import { Container, Typography, Box } from '@mui/material';

function App() {
  return (
    <ContactProvider>
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Contact Management
          </Typography>
          <ContactForm />  {/* Add the ContactForm here */}
          <ContactTable /> {/* This will also have access to the context */}
        </Box>
      </Container>
    </ContactProvider>
  );
}

export default App;
