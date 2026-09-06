import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/product.model";

export const createCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user?.id;
    const { items } = req.body;

    let findCartUser = await Cart.findOne({ user: userId });

    if (!findCartUser) {
      findCartUser = await Cart.create({ user: userId, items });
    } else {
      for (const newItem of items) {
        const product = await Product.findById(newItem.productId);

        if (!product) {
          return res.status(404).json({ message: "Товар не найден" });
        }

        if (product.stock < newItem.quantity) {
          return res.status(400).json({ message: "Недостаточно на складе" });
        }

        const existing = findCartUser.items.find(
          (item) => item.product.toString() === newItem.productId,
        );

        if (existing) {
          existing.quantity += newItem.quantity;
        } else {
          findCartUser.items.push({
            product: newItem.productId,
            quantity: newItem.quantity,
          });
        }
      }
      await findCartUser.save();
    }

    res.status(200).json({ cart: findCartUser });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const userCart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name price image",
    );

    res.status(200).json({ cart: userCart });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

export const removeCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userSendId = req.params.productId;
    const userId = req.user.id;

    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    userCart.items = userCart?.items.filter((item: any) => {
      return item.product.toString() != userSendId;
    });

    await userCart.save();

    res.status(200).json({ cart: userCart });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userSendId = req.params.productId;
    const userId = req.user.id;

    const quantity = req.body.quantity;

    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    let foundQuantity = userCart.items.find(
      (item: any) => item.product.toString() == userSendId,
    );

    if (foundQuantity) {
      foundQuantity.quantity = quantity;
    }

    await userCart.save();

    res.status(200).json({ cart: userCart });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};
