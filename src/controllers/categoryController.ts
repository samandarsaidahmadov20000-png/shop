import { Request, Response } from "express";
import Category from "../models/category.model";
import Product from "../models/product.model";

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

    res.status(200).json({ categories });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const categoriesDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productsCount = await Product.countDocuments({ category: id });

    if (productsCount > 0) {
      return res.status(400).json({
        message: "Cannot delete category with products. Remove products first.",
      });
    }

    const deleteCategory = await Category.findByIdAndDelete(id);

    if (!deleteCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ data: deleteCategory });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const categoriesUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updateCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true },
    );


    if(!updateCategory) {
     res.status(404).json({ message: "Category not found"})
    }

    res.status(200).json({ data: updateCategory });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};
