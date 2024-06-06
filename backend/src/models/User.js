import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);
export default User;
