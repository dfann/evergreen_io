import Joi from 'joi';
import User from '../models/User.js'
import crypto from 'crypto';



// exports.validateRegister = (req, res, next) => {

//   const errors = validationResult(req);
//   console.log(errors);
//   if (!errors.isEmpty()) {
//     res.status(400).json(errors);
//     return;
//   }
//   next(); // there were no errors!
// };

const createNewUser = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      await Joi.validate({ username, email, password }, signUp);
      const newUser = new User({ username, email, password });
      await newUser.save();
      /*middle ware*/
      const sessionUser = sessionizeUser(newUser);
      req.session.user = sessionUser;
      res.send(sessionUser);
      /*middle ware */
  } catch (err) {
      res.status(400).send(parseError(err));
  }
};

export {createNewUser};
// exports.register = async (req, res, next) => {
//   const user = new User({ email: req.body.email, username: req.body.username });
//   const register = promisify(User.register, User);
//   try {
//     await register(user, req.body.password);
//     next(); // pass to authController.login
//   }
//   catch (err){
//     console.log('\n\nerr:', err, ':err\n\n');
//     res.status(400).json({message: err.message});
//   }
// };

// exports.account = (req, res) => {
//   res.render('account', { title: 'Edit Your Account' });
// };

// exports.updateAccount = async (req, res) => {
//   const updates = {
//     name: req.body.name,
//     email: req.body.email
//   };

//   const user = await User.findOneAndUpdate(
//     { _id: req.user._id },
//     { $set: updates },
//     { new: true, runValidators: true, context: 'query' }
//   );
//   req.flash('success', 'Updated the profile!');
//   res.redirect('back');
// };
