import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/product.model";

export const createCart = async (req: Request, res: Response) => {
  // const { items } = req.body;

  const { productId, quantity } = req.body;
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const foundProduct = await Product.findById(productId);
    if (!foundProduct) {
      return res.status(404).json({ message: "not found product" });
    }

    let findCartUser = await Cart.findOne({ user: userId });

    if (!findCartUser) {
      const createdCart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      return res.status(200).json({ createdCart });
    }

    const foundCart = findCartUser.items.find(
      (item: any) => item.product.toString() == productId,
    );
    if (foundCart) {
      foundCart.quantity += quantity;
    } else {
      findCartUser.items.push({ product: productId, quantity });
    }

    await findCartUser.save();

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
