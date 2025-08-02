import { connect } from 'http2';
import {app} from './app';
import connectDB from './utils/db';
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(
  process.env.PORT,
  () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB(); // Ensure the database connection is established when the server starts
  }
);
