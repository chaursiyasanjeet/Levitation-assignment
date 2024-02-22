import mongoose, { Document, Schema } from "mongoose";

interface User extends Document {
  name: string;
  email: string;
  mobile: number;
  password: string;
  products?: any[];
}

const userSchema: Schema<User> = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  products: {
    type: Array,
    required: false,
    unique: false,
  },
});

export default mongoose.model<User>("LevitationUser", userSchema);
