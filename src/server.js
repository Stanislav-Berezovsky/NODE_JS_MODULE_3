import express from 'express';
import userRouter from './routers/userRouter';
import groupsRouter from './routers/groupRouter';
import userGroupRouter from './routers/userGroupRouter';
import connectDB from './DAL/DBConnection';

const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use('/groups', groupsRouter);
app.use('/usergroup', userGroupRouter);

app.use('/', (_req, res) => {
    res.status(404).json({ message: 'not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`start listen port ${port}`));
connectDB();
