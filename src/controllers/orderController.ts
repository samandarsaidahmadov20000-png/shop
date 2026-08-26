import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Order from "../models/order.model";

export const createOrder = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = req.user.id;

    const cartUser = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "price stock name",
    );

    if (!cartUser) {
      return res.json({ message: "Cart is empty" });
    }

    let totalPrice = 0;

    let order = [];

    for (let i = 0; i < cartUser.items.length; i++) {
      let product = cartUser.items[i].product as any;

      if (product.stock < cartUser.items[i].quantity) {
        return res.json({ message: product.name, enough: "not enough" });
      }
    }

    for (let i = 0; i < cartUser.items.length; i++) {
      let product = cartUser.items[i].product as any;

      totalPrice += product.price * cartUser.items[i].quantity;

      product.stock -= cartUser.items[i].quantity;

      await product.save();

      order.push({
        product: product._id,
        quantity: cartUser.items[i].quantity,
        price: product.price,
      });
    }

    let orderCreate = await Order.create({
      user: userId,
      items: order,
      totalPrice,
    });

    cartUser.items = [];

    await cartUser.save();

    res.status(200).json({ orderCreate });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

export const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    const orderHistory = await Order.find({ user: userId }).populate(
      "items.product",
      "name price image",
    );

    res.status(200).json({ order: orderHistory });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};


export const getAllOrders = async (req: Request, res: Response) => {
  
  try {
    
    const allHistoryOrders  = await Order.find({}).populate("items.product","name image price")


    
    
    res.status(200).json({allOrderHistory: allHistoryOrders})
    



  }catch(error: any) {
    res.status(403).json({message: error.message})
  }

}



export const updateOrderStatus = async (req: Request, res: Response) => {
   
  try { 

    const {id} = req.params;
    const {status} = req.body;

    
    const orderStatusChange = await Order.findByIdAndUpdate(id,{status},{new: true, runValidators: true});


    res.status(200).json({orderStatusChange})




  }
  catch(error: any) {
    res.status(403).json({message: error.message})
  }
}