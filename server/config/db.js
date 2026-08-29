import mongoose from 'mongoose';

/**
 * Connect to MongoDB Atlas
 * Gracefully handles connection retries and falls back to informational logging if URI is not provided.
 */
export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoURI) {
    console.warn(
      '\n⚠️ [MongoDB Atlas] MONGO_URI is not set in your .env file.\n' +
      '   The server will run in Standalone/Mock Sync mode.\n' +
      '   To connect your live MongoDB Atlas database, add MONGO_URI to your .env file.\n'
    );
    return null;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`\n🍃 [MongoDB Atlas] Connected successfully: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`\n❌ [MongoDB Atlas] Connection error: ${error.message}`);
    console.warn('   Server continues in fallback mode. Please check your Atlas IP whitelist and credentials.');
    return null;
  }
};
