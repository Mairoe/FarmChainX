# FarmChainX Backend Setup Guide

This is a production-ready Node.js & Express backend for the FarmChainX platform.

## 🛠️ Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local installed or MongoDB Atlas URI)

## 🚀 Quick Start Instructions

### 1. Navigating to the Server Directory
Open your terminal and enter the server directory:
```bash
cd server
```

### 2. Install Dependencies
Install all required packages:
```bash
npm install
```

### 3. Configure Environment Variables
Create a file named `.env` in the `server` folder (or edit the existing one):
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/farmchainx
JWT_SECRET=yoursupersecretjwtkey123
```
*Note: Replace `MONGO_URI` with your Atlas connection string if using the cloud.*

### 4. Ensure MongoDB is Running
Make sure your local MongoDB service is started or your Atlas IP whitelist is updated.

### 5. Start the Server
Run the backend in development mode (with auto-restart):
```bash
npm run dev
```

The server should now be running at `http://localhost:5000`.

## 📁 Project Structure
- `config/`: Database connection logic
- `models/`: Mongoose schemas (User, Batch)
- `routes/`: API endpoint definitions
- `controllers/`: Logic for each route
- `middleware/`: Auth protection (JWT)
- `index.js`: Main entry point
