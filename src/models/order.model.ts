import mongoose, { Document, Schema } from "mongoose";

interface IOrderItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
}


interface IOrder  extends Document {
    user: mongoose.Types.ObjectId;
    items: IOrderItem[];
    totalPrice: number;
    status: "pending" | "paid" | "shipped" | "delivered";
}



const orderSchema = new Schema<IOrder> ({
   user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
   items: [
    {
        product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
        quantity: {type: Number, required: true},
        price: {type: Number, required: true},
    }

    
   ],
   totalPrice: {type: Number, required: true},
   status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered"],
    default: "pending",
   }

})


const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;