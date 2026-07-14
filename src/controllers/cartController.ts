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
        items:  [{product: productId, quantity}],
      });
      return res.status(200).json({ createdCart });
    }


    
    const foundCart = findCartUser.items.find((item: any) => item.product.toString() == productId);
    if(foundCart) {
      foundCart.quantity += quantity
      
    } else {
      findCartUser.items.push({product: productId,quantity})
    }
    
    await findCartUser.save();

    res.status(200).json({cart: findCartUser})

     

   


  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
