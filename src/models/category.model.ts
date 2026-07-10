import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  description: string;
}

const productSchema = new Schema<ICategory>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

const Category = mongoose.model<ICategory>("Category", productSchema);

export default Category;
