import { Router } from 'express';
import validate from './validators/userValidator';
import loggerMiddleware from './loggerMiddleware';
import UserModel from '../Models/userModel';
import UserService from '../services/userService';
import { logServiceError } from '../helpers/loggerHelper';

const router = Router();

router.get('/autoSuggest',
    loggerMiddleware({ serviceName:'UserService', method: 'getAutosuggested' }),
    async (req, res) => {
        const { loginSubstring, limit } = req.query || {};
        const userServiceInstance = new UserService(UserModel);
        const params = { loginSubstring, limit };
        try {
            const users = await userServiceInstance.getAutosuggested(params);
            res.json({ users });
        } catch (e) {
            logServiceError({ name: 'UserService', method:'getAutosuggested', errorMessage: e.message, params });
        }
    });

router.get('/',
    loggerMiddleware({ serviceName:'UserService', method: 'getAllItems' }),
    async (req, res) => {
        const userServiceInstance = new UserService(UserModel);

        try {
            const users = await userServiceInstance.getAllItems();
            res.json(users);
        } catch (e) {
            logServiceError({ name: 'UserService', method:'getAllItems', errorMessage: e.message });
        }
    });

router.get('/:id',
    loggerMiddleware({ serviceName:'UserService', method: 'getItemById' }),
    async (req, res) => {
        const params = { id:req.params.id };
        const userServiceInstance = new UserService(UserModel);
        try {
            const user = await userServiceInstance.getItemById(params);

            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        } catch (e) {
            logServiceError({ name: 'UserService', method:'getItemById', errorMessage: e.message, params });
        }
    });

router.post('/',
    validate,
    loggerMiddleware({ serviceName:'UserService', method: 'addItem' }),
    async (req, res) => {
        const { login, password, age } = req.body;
        const params = { login, password, age };
        const userServiceInstance = new UserService(UserModel);

        try {
            const user = await userServiceInstance.addItem(params);
            if (user) {
                res.json({ message: 'user was successfully added' });
            } else {
                res.status(400).json({ message: 'this login is already existed' });
            }
        } catch (e) {
            logServiceError({ name: 'UserService', method:'addItem', errorMessage: e.message, params });
        }
    });

router.put('/:id',
    validate,
    loggerMiddleware({ serviceName:'UserService', method: 'updateItem' }),
    async (req, res) => {
        const id = req.params.id;
        const { login, password, age } = req.body;
        const params = { id, login, password, age };
        const userServiceInstance = new UserService(UserModel);

        try {
            const user = await userServiceInstance.updateItem(params);
            if (user) {
                res.json({ message: 'user was successfully updated' });
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } catch (e) {
            logServiceError({ name: 'UserService', method:'updateItem', errorMessage: e.message, params });
        }
    });

router.delete('/:id',
    loggerMiddleware({ serviceName:'UserService', method: 'deleteItem' }),
    async (req, res) => {
        const id = req.params.id;
        const userServiceInstance = new UserService(UserModel);

        try {
            await userServiceInstance.deleteItem(id);
            res.json({ message: 'user was successfully deleted' });
        } catch (e) {
            logServiceError({ name: 'UserService', method:'deleteItem', errorMessage: e.message, params: { id } });
        }
    });

export default router;
