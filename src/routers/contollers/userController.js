import UserModel from '../../Models/userModel';
import UserService from '../../services/userService';
import { logServiceError } from '../../helpers/loggerHelper';

export const autoSuggestUsers = async (req, res, next) => {
    const { loginSubstring, limit } = req.query || {};
    const userServiceInstance = new UserService(UserModel);
    const params = { loginSubstring, limit };
    try {
        const users = await userServiceInstance.getAutosuggested(params);
        res.json({ users });
    } catch (e) {
        logServiceError({ name: 'UserService', method:'getAutosuggested', errorMessage: e.message, params });
        // eslint-disable-next-line
        next(e);
    }
};

export const getAllUsers = async (req, res, next) => {
    const userServiceInstance = new UserService(UserModel);

    try {
        const users = await userServiceInstance.getAllItems();
        res.json(users);
    } catch (e) {
        logServiceError({ name: 'UserService', method:'getAllItems', errorMessage: e.message });
        // eslint-disable-next-line
        next(e);
    }
};

export const getUserById = async (req, res, next) => {
    const params = { id: req.params.id };
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
        // eslint-disable-next-line
        next(e);
    }
};

export const addNewUser =  async (req, res, next) => {
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
        // eslint-disable-next-line
        next(e);
    }
};

export const updateUser = async (req, res, next) => {
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
        // eslint-disable-next-line
        next(e);
    }
};

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const userServiceInstance = new UserService(UserModel);

    try {
        const user = await userServiceInstance.deleteItem(id);
        if (user) {
            res.json({ message: 'user was successfully deleted' });
        } else {
            res.json({ message: 'This user does not exist' });
        }
    } catch (e) {
        logServiceError({ name: 'UserService', method:'deleteItem', errorMessage: e.message, params: { id } });
        // eslint-disable-next-line
        next(e);
    }
};

