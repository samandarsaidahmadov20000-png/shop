import express from "express";
import authRoute from "./routes/authRoute";
import productRoute from "./routes/productRoute";
import dbConnect from "./config/db";
import categoryRoute from "./routes/categoryRoute"
import path from "path";


const app = express();



app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use(express.json());




app.use("/auth", authRoute);

app.use("/products",  productRoute);

app.use('/category',categoryRoute);


dbConnect();

app.listen(process.env.PORT || 4000, () => {
  console.log("server run");
});
