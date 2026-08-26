import { Server, Socket } from "socket.io";
import Message from "../models/message";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    const user = socket.data.user;
    console.log("Подключился:", user.id);

    if (user.role !== "admin") {
      socket.join(user.id);
    }

    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("sendMessage", async (data) => {
      const { text, userId } = data;
      const conversationId = user.role === "admin" ? userId : user.id;

      const message = await Message.create({
        conversationId,
        sender: user.id,
        text,
        isFromAdmin: user.role === "admin",
      });
      
      io.to(conversationId).emit("receiveMessage", message);

    });

    socket.on("disconnect", () => console.log("Отключился:", user.id));
  });
};
