import { Request, Response } from "express";
import Category from "../models/category.model";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const categoryCreated = await Category.create({
      name,
      description,
    });

    res.status(200).json({ categoryCreated });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    
    const categories = await Category.find();


    res.status(200).json({categories})



  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
