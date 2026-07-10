import mongoose, { Schema, Document } from "mongoose";

interface Iproduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: mongoose.Types.ObjectId;
  image: string;
}

const productSchema = new Schema<Iproduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: { type: String, required: true },
});

const Product = mongoose.model<Iproduct>("Product", productSchema);

export default Product;
