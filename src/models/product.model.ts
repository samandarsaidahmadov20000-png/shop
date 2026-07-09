import mongoose, { Schema, Document } from "mongoose";

interface Uproduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

const productSchema = new Schema<Uproduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model<Uproduct>("Product", productSchema);

export default Product;
