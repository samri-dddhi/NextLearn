import { error } from 'console';
import { connect } from 'http2';
import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl:string = process.env.DB_URI || 'mongodb://localhost:27017/mydatabase';

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data:any) => {
      console.log('Database connected successfully with ${data.connection.host}');

    });
  } catch (error:any) {
    console.error('Database connection failed:', error.message);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
}

export default connectDB;
