# **Contact Management System**

A simple Contact Management mini-feature for a CRM that allows users to perform CRUD operations (Create, Read, Update, Delete) on contact records. Built using **ReactJS** for the frontend, **NodeJS** for the backend, and **MongoDB Atlas** as the database.

---

## **Features**
- Add new contacts with validation for fields like name, email, and phone number.
- View a paginated list of contacts, with sorting functionality.
- Edit existing contacts.
- Delete contacts.
- RESTful APIs for backend services.

---

## **Technologies Used**
### **Frontend**
- ReactJS
- Material UI
- Axios

### **Backend**
- NodeJS
- ExpressJS
- MongoDB Atlas

---

## **Setup Instructions**

### **Prerequisites**
- **Node.js** and **npm** installed.
- **MongoDB Atlas** account (or local MongoDB setup).
- **Git** installed.

---

**Clone the Repository**
```bash
git clone https://github.com/ghratika/Contact-Management-System.git
### **2. Setup the Backend**
- Navigate to the server folder: `cd server`
- Install dependencies: `npm install`
- Create a `.env` file in the server folder and add your MongoDB connection string and server port:
MONGO_URI= ""
PORT=5000
- Run the server: `npm start`
- The backend will start at `http://localhost:5000`.

---

### **3. Setup the Frontend**
- Navigate to the client folder: `cd ../client`
- Install dependencies: `npm install`
- Start the React development server: `npm start`
- The frontend will run at `http://localhost:3000`.

