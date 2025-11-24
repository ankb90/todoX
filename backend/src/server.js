import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import taskRouters from './routers/taskRouters.js';
import { connectDB } from './config/db.js';

//- Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//- Middleware
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));

//- Register routers
app.use('/api/tasks', taskRouters);

//- Connect to MongoDB
connectDB().then(() => {
  //- Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
