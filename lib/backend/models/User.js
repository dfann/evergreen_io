import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: username => User.doesNotExist({
        username
      }),
      message: 'Username already exists'
    }
  },
  email: {
    type: String,
    validate: {
      validator: email => User.doesNotExist({
        email
      }),
      message: 'Email already exists'
    }
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});
/*
Because of lexical scoping, we cannot use arrow functions for these three methods.
*/

UserSchema.pre('save', function () {
  if (this.isModified('password')) {
    this.password = bcryptjs.hashSync(this.password, 10);
  }
});

UserSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

UserSchema.methods.comparePasswords = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

const User = mongoose.model('User', UserSchema);
export default User;