import { Router } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';
import AuthorizationService from '../services/AuthorizationService';
import UserModel from '../models/UserModel';
import loggerMiddleware from './loggerMiddleware';

const router = Router();
const authorizationServiceInstance = new AuthorizationService(UserModel);

router.post('/', loggerMiddleware('login'), async (req, res, next) => {
    const { login, password } = req.body;

    try {
        const user = await authorizationServiceInstance.login(login, password);

        if (!user) {
            return res.status(403).json({ message: 'Wrong username or password' });
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, config.secret, { expiresIn: 60 });
        res.json({ token });
    } catch (err) {
        // eslint-disable-next-line
        next(err);
    }
});

export default router;
