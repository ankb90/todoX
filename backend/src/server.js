import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import taskRouters from './routers/taskRouters.js';
import { connectDB } from './config/db.js';

//- Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

//- Middleware
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: ['http://localhost:5173'] }));
}
//- Register routers
app.use('/api/tasks', taskRouters);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

//- Connect to MongoDB
connectDB().then(() => {
  //- Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
