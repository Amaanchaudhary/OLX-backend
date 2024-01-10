import express from 'express'
import router from './Routes/index.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';    

const app = express();

dotenv.config()
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());


app.get("/", function (req, res) {
    res.send("Welcome to OLX backend server");
})

app.use("/api/v1" , router)

mongoose.connect(process.env.MONGOURL).then(() => console.log("Database Connected"));
app.listen(8000, () => console.log("App is running on 8000 port"));
