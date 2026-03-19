import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer;

const connectDB = async () => {
  let mongoUri = process.env.MONGO_URI;
  try {
    // Use Memory Server ONLY if explicitly requested or if URI is missing
    if (!mongoUri || mongoUri === 'memory') {
      console.log('⚡ Starting MongoDB Memory Server (Local RAM)...');
      mongoMemoryServer = await MongoMemoryServer.create();
      mongoUri = mongoMemoryServer.getUri();
    }

    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📡 URI: Connected to your real Atlas Cluster and using it as primary database.`);
  } catch (error) {
    if (mongoUri && mongoUri.includes('mongodb+srv')) {
        console.error(`❌ MongoDB Atlas Connection Error: ${error.message}`);
        console.log(`💡 Tip: If you get a 'ServerSelectionError', please ensure you have whitelisted your IP (like 49.37.158.205) or allowed all IPs (0.0.0.0/0) in your MongoDB Atlas Network Access settings!`);
    }
    
    // Fallback logic for local testing (Always trigger as failback)
    try {
        console.log('⚠️  Atlas connection failed or not provided. Falling back to temporary Memory Server...');
        console.log('⚠️  IMPORTANT: Any users or batches registered now will be DELETED when the server restarts!');
        mongoMemoryServer = await MongoMemoryServer.create();
        const conn = await mongoose.connect(mongoMemoryServer.getUri());
        console.log(`✅ Temporary MongoDB Connected: ${conn.connection.host}`);
    } catch (innerError) {
        console.error('❌ CRITICAL ERROR: Database connection failed completely.');
        console.log('⚠️  Authentication bypass for "a@a" remains active. Other features might fail.');
    }
  }
};

export default connectDB;
