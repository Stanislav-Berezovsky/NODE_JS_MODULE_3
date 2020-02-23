import { Router } from 'express';
import validate from './validators/userValidator';
import loggerMiddleware from './loggerMiddleware';
import UserModel from '../Models/userModel';
import UserService from '../services/userService';

const router = Router();

router.get('/autoSuggest',
    loggerMiddleware({ serviceName:'UserService', method: 'getAutosuggested' }),
    async (req, res) => {
        const { loginSubstring, limit } = req.query || {};
        const userServiceInstance = new UserService(UserModel);
        const users = await userServiceInstance.getAutosuggested({ loginSubstring, limit });
        res.json({ users });
    });

router.get('/',
    loggerMiddleware({ serviceName:'UserService', method: 'getAllItems' }),
    async (req, res) => {
        const userServiceInstance = new UserService(UserModel);
        const users = await userServiceInstance.getAllItems();

        res.json(users);
    });

router.get('/:id',
    loggerMiddleware({ serviceName:'UserService', method: 'getItemById' }),
    async (req, res) => {
        const userServiceInstance = new UserService(UserModel);
        const user = await userServiceInstance.getItemById({ id:req.params.id });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    });

router.post('/',
    validate,
    loggerMiddleware({ serviceName:'UserService', method: 'addItem' }),
    async (req, res) => {
        const { login, password, age } = req.body;
        const userServiceInstance = new UserService(UserModel);
        const user = await userServiceInstance.addItem({ login, password, age });
        if (user) {
            res.json({ message: 'user was successfully added' });
        } else {
            res.status(400).json({ message: 'this login is already existed' });
        }
    });

router.put('/:id',
    validate,
    loggerMiddleware({ serviceName:'UserService', method: 'updateItem' }),
    async (req, res) => {
        const id = req.params.id;
        const { login, password, age } = req.body;
        const userServiceInstance = new UserService(UserModel);
        const user = await userServiceInstance.updateItem({ id, login, password, age });
        if (user) {
            res.json({ message: 'user was successfully updated' });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    });

router.delete('/:id',
    loggerMiddleware({ serviceName:'UserService', method: 'deleteItem' }),
    async (req, res) => {
        const id = req.params.id;
        const userServiceInstance = new UserService(UserModel);
        await userServiceInstance.deleteItem(id);
        res.json({ message: 'user was successfully deleted' });
    });

export default router;
