import { Request, Response } from "express";
import Product from "../models/product.model";

import imagekit from "../config/imagekit";

export const createProduct = async (req: Request, res: Response) => {


  try {
    const { name, description, price, stock, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const uploaded = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image: uploaded.url,
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
