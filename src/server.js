import 'dotenv/config.js';
import express from 'express';
import mongoose from 'mongoose';
mongoose.set('useUnifiedTopology', true);
import session from 'express-session';
import connectStore from 'connect-mongo';
import cors from 'cors';
import { userRoutes, sessionRoutes } from './backend/routes/index.js';
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
        app.use(cors());
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
                    sameSite: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: parseInt(process.env.SESS_LIFETIME),
                },
            })
        );

        const apiRouter = express.Router();
        app.use('/api', apiRouter);
        apiRouter.use('/users', userRoutes);
        apiRouter.use('/session', sessionRoutes);

        app.listen(process.env.PORT, () =>
            console.log(`Listening on port ${process.env.PORT}`)
        );
    } catch (err) {
        console.log(err);
    }
})();
