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
  // const { page = 1, limit = 10 } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  try {
    const { name } = req.query;

    const criteria: any = {};

    if (name) criteria.name = { $regex: name as string, $options: "i" };

    const products = await Product.find(criteria)
      .populate("category", "name")
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments(criteria);

    res.status(200).json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productDeleted = await Product.findByIdAndDelete(id);

    res.send({
      data: productDeleted,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const upadetProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category } = req.body;

    const updateData: any = { name, description, price, stock, category };

    if (req.file) {
      const uploaded = await imagekit.upload({
        file: req.file?.buffer,
        fileName: req.file?.originalname,
      });
      updateData.image = uploaded.url;
    }

    const upadetedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ upadetedProduct });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};