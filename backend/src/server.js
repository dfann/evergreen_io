import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
mongoose.set('useUnifiedTopology', true);
import session from 'express-session';
import connectStore from 'connect-mongo';
import cors from 'cors';
import { userRoutes, sessionRoutes, questionRoutes } from './routes/index.js';
import cookiParser from 'cookie-parser';
// import { PORT, NODE_ENV, MONGO_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from './config';

(async () => {
    console.log(process.env.MONGO_URI);
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log('MongoDB connected');

        const app = express();
        const MongoStore = connectStore(session);
        app.disable('x-powered-by');
        app.use(express.urlencoded({ extended: true }));

        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:5000',
        ];

        app.use(
            cors({
                origin: function (origin, callback) {
                    // allow requests with no origin
                    // (like mobile apps or curl requests)
                    if (!origin) return callback(null, true);
                    if (allowedOrigins.indexOf(origin) === -1) {
                        var msg =
                            'The CORS policy for this site does not ' +
                            'allow access from the specified Origin.';
                        return callback(new Error(msg), false);
                    }
                    return callback(null, true);
                },
                credentials: true,
            })
        );
        app.use(express.json());
        app.use(
            session({
                name: process.env.SESS_NAME,
                secret: process.env.SESS_SECRET,
                saveUninitialized: false,
                resave: false,
                store: new MongoStore({
                    mongooseConnection: mongoose.connection,
                    collection: 'session',
                    ttl: parseInt(process.env.SESS_LIFETIME) / 1000,
                }),
                cookie: {
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: parseInt(process.env.SESS_LIFETIME),
                },
            })
        );

        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        apiRouter.use('/users', userRoutes);
        apiRouter.use('/session', sessionRoutes);
        apiRouter.use('/questions', questionRoutes);

        app.listen(process.env.PORT, () =>
            console.log(`Listening on port ${process.env.PORT}`)
        );
    } catch (err) {
        console.log(err);
    }
})();
