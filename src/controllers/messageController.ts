import { Request, Response } from "express";
import Message from "../models/message";

export const createMessage = async (req: Request, res: Response) => {
  try {
    const userId: any = req.user?.id;

    const { text } = req.body;

    const messageData = await Message.create({
      conversationId: req.user?.role === "admin" ? req.body.userId : userId,
      sender: userId,
      text,
      isFromAdmin: req.user?.role === "admin",
    });

    res.status(200).json({ messageData });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const role = req.user?.role;

    const conversationId = role === "admin" ? req.params.userId : req.user?.id;

    const message = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });

    res.status(200).json({ message });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

export const getConversations = async (req: Request, res: Response) => {
  try {
    const conversations = await Message.distinct("conversationId");
    res.json({conversations})
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};
