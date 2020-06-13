import Joi from 'joi';
import User from '../models/User.js';
import { parseError, sessionizeUser } from '../util/helpers.js';
import { signUp, signIn } from '../joi_validations/user.js';
import crypto from 'crypto';
import mail from '../util/mail';

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

const createUserSession = async (req, res) => {
    try {
        const { email, password } = req.body;
        await Joi.validate({ email, password }, signIn);
        const user = await User.findOne({ email });
        if (user && user.comparePasswords(password)) {
            /*middle ware */
            const sessionUser = sessionizeUser(user);
            req.session.user = sessionUser;
            res.send(sessionUser);
            /*middle ware*/
        } else {
            res.status(401).send({ mesage: 'Invalid login credentials' });
        }
    } catch (err) {
        res.status(401).send(parseError(err));
    }
};

const destoryUserSession = ({ session = {} }, res) => {
    try {
        const user = session.user;
        if (user) {
            /*middle ware*/
            session.destroy((err) => {
                if (err) throw err;
                res.clearCookie(SESS_NAME);
                res.send(user);
                /* middleware*/
            });
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        res.status(422).send(parseError(err));
    }
};

const forgotPassword = async ({ body: { email } }, res) => {
    const user = await User.findOne({ email });
    if (!user) {
        res.status(200).send({
            message: 'A reset link has been sent to the given email address.',
        });
        return;
    }
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save({ validateModifiedOnly: true });

    mail.send();
};

export { createNewUser, createUserSession, destoryUserSession, forgotPassword };

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
