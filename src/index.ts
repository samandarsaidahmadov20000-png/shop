import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoute from "./routes/authRoute";
import productRoute from "./routes/productRoute";
import dbConnect from "./config/db";
import categoryRoute from "./routes/categoryRoute";
import cartRoute from "./routes/cartRoute";
import path from "path";
import orderRout from "./routes/orderRoute";
import messageRoute from "./routes/messageRoute";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

import { socketAuth } from "./middleware/socketAuth";
import { socketHandler } from "./socket/socketHandler";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.use(socketAuth);
socketHandler(io);

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use("/auth", authRoute);

app.use("/products", productRoute);

app.use("/category", categoryRoute);
app.use("/cart", cartRoute);

app.use("/order", orderRout);
app.use("/message", messageRoute);

dbConnect();

httpServer.listen(process.env.PORT || 4000, () => {
  console.log("server run");
});
