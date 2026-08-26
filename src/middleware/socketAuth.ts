import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token"));
  try {
    const decoded = jwt.verify(token, process.env.KEY as string);
    socket.data.user = decoded;
    next()
  } catch (err) {
    next(new Error("Invalid token"));
  }
};
