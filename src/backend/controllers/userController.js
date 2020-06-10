const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');
const { validationResult } = require('express-validator');


exports.validateRegister = (req, res, next) => {

  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }
  next(); // there were no errors!
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, username: req.body.username });
  const register = promisify(User.register, User);
  try {
    await register(user, req.body.password);
    next(); // pass to authController.login
  }
  catch (err){
    console.log('\n\nerr:', err, ':err\n\n');
    res.status(400).json({message: err.message});
  }
};

// exports.account = (req, res) => {
//   res.render('account', { title: 'Edit Your Account' });
// };

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );
  req.flash('success', 'Updated the profile!');
  res.redirect('back');
};
