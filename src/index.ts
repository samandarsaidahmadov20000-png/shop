import express from "express";
import authRoute from "./routes/authRoute";
import dbConnect from "./config/db";
const app = express();

app.use(express.json());



app.use('/auth', authRoute)

dbConnect()



app.listen(process.env.PORT || 3000, () => {
    console.log('server run');


})