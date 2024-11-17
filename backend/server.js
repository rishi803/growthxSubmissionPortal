
import express, { json } from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';


dotenv.config();

// const userRoutes = require("./routes/userRoutes");
// const adminRoutes = require("./routes/adminRoutes");

const app = express();
connectDB();

app.use(json());
app.use(cors());


app.get('/', (req,res)=>{
    res.send("<h1>hello</h1>");
})

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', assignmentRoutes);

  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
