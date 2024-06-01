import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 50
  },
  email: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minLength: 5
  },
  role: {
    type: Number,
    default: 0
  },
  image: String
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
