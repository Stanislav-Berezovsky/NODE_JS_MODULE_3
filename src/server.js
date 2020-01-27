import express from 'express';
import userRouter from './routers/userRouter';

const app = express();

app.use(express.json());
app.use('/users', userRouter);

app.use('/', (_req, res) => {
    res.status(404).json({ message: 'not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`start listen port ${port}`));
