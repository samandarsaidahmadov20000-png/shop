import { Request, Response } from "express";
import Product from "../models/product.model";
import multer from "multer";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image,
    });

    res.status(200).json({ product });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("category", "name");

    res.status(200).json(products);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
