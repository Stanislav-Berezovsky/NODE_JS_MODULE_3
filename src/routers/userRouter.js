import { Router } from 'express';
import validate from '../services/userValidator';
import UserModel from '../Models/UserModel';
import UserService from '../services/userService';

const router = Router();

router.get('/autoSuggest', async (req, res) => {
    const { loginSubstring, limit } = req.query || {};
    const userServiceInstance = new UserService(UserModel);
    const users = await userServiceInstance.getAutosuggestedUsers({ loginSubstring, limit });
    res.json({ users });
});

router.get('/', async (req, res) => {
    const userServiceInstance = new UserService(UserModel);
    const users = await userServiceInstance.getAllUsers();

    res.json(users);
});

router.get('/:id', async (req, res) => {
    const userServiceInstance = new UserService(UserModel);
    const user = await userServiceInstance.getUserById(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});

router.post('/', validate, async (req, res) => {
    const { login, password, age } = req.body;
    const userServiceInstance = new UserService(UserModel);
    const user = await userServiceInstance.addUser({ login, password, age });
    if (user) {
        res.json({ message: 'user was successfully added' });
    } else {
        res.status(400).json({ message: 'this login is already existed' });
    }
});

router.put('/:id', validate, async (req, res) => {
    const id = req.params.id;
    const { login, password, age } = req.body;
    const userServiceInstance = new UserService(UserModel);
    const user = await userServiceInstance.updateUser({ id, login, password, age });
    if (user) {
        res.json({ message: 'user was successfully updated'});
    } else {
        res.status(404).json({ message: 'not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const userServiceInstance = new UserService(UserModel);
    await userServiceInstance.deleteUserById(id);
    res.json({ message: 'user was successfully deleted' });
});

export default router;
