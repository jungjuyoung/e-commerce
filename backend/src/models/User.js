const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
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

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    console.log('[save] salt: ', salt);
    const hash = await bcrypt.hash(this.password, salt);
    console.log('[save] hash: ', hash);
    this.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  console.log('[comparePassword] plainPassword: ', plainPassword);
  console.log('[comparePassword] this: ', this);
  const match = await bcrypt.compare(plainPassword, this.password);
  return match;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
