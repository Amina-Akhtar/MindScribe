const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const userRoutes = require('./routes/userRoutes');
app.use("/api/user", userRoutes);

const postRoutes=require('./routes/postRoutes')
app.use("/api/posts",postRoutes)

const notificationRoutes=require('./routes/notificationRoutes')
app.use("/api/notifications",notificationRoutes)

connectDB().then(()=>{
  app.listen(PORT,()=>{
   console.log(`Server running on port ${PORT}`);
  })
});