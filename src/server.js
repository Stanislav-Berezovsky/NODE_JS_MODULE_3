import express from 'express';
import userRouter from './routers/userRouter';
import groupsRouter from './routers/groupRouter';
import userGroupRouter from './routers/userGroupRouter';
import loginRouter from './routers/loginRouter';
import connectDB from './DAL/DBConnection';
import { db } from './DAL/DBConfiguration';
import { logger } from './helpers/loggerHelper';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupsRouter);
app.use('/usergroup', userGroupRouter);
app.use('/login', loginRouter);

app.use('/', (_req, res) => {
    res.status(404).json({ message: 'not found' });
});


// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    logger.log('error', `status: ${err.status}, message: ${err.message}`);
    res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`start listen port ${port}`));
connectDB();

process
    .on('unhandledRejection', (reason, promise) => {
        logger.log('error', `Unhandled Rejection at: ${promise}, reason: ${reason}`);
    })
    .on('uncaughtException', err => {
        logger.log('error', `Uncaught exception error: ${err}`);
        db.close();
        process.exit(1);
    });
