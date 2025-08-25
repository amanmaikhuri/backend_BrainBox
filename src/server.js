import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from "../src/routes/notesRoutes.js"
import { connectDB } from './config/db.js';
import rateLimiter from '../src/middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 5001;
dotenv.config();

//middleware
app.use(cors()); 
app.use(express.json());
app.use(rateLimiter);// Apply rate limiting middleware


app.use("/api/notes", notesRoutes);

// app.get('/', (_, res) => {
//   res.send('API is running...');  
// });

connectDB().then( () => {
  app.listen(PORT, () => {
  console.log('Server is running on port 5001');
  });
});


