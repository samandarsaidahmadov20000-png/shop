import mongoose, {Schema, Document} from "mongoose";


interface ICartItem {
    product: mongoose.Types.ObjectId;
    quantity: number;
}

interface ICart extends Document {
    user: mongoose.Types.ObjectId;
    items: ICartItem[];
}






const cartSchema = new Schema<ICart>({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    items: [
        {
            product: {type: mongoose.Schema.ObjectId, ref: "Product", required: true},
            quantity: {type: Number, required: true, default: 1}
        }
    ]
})


const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;