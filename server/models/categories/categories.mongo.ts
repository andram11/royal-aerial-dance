import mongoose, { Document, Schema, Model } from 'mongoose';

// Define an interface for the Category document
export interface ICategory extends Document {
  title: string;
  imageUrl: string;
  route: string;
}

// Define the schema with TypeScript types
const categorySchema: Schema<ICategory> = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
});

// Export the model
const Category: Model<ICategory> = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
