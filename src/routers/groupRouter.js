import { Router } from 'express';
import GroupModel from '../Models/groupModel';
import GroupService from '../services/groupService';

const router = Router();

router.get('/', async (req, res) => {
    const groupServiceInstance = new GroupService(GroupModel);
    const groups = await groupServiceInstance.getAllItems();

    res.json(groups);
});

router.get('/:id', async (req, res) => {
    const groupServiceInstance = new GroupService(GroupModel);
    const group = await groupServiceInstance.getItemById({ id: req.params.id });

    if (group) {
        res.json(group);
    } else {
        res.status(404).json({ message: 'group not found' });
    }
});

router.post('/', async (req, res) => {
    const { name, permissions } = req.body;
    const groupServiceInstance = new GroupService(GroupModel);
    const group = await groupServiceInstance.addItem({ name, permissions });
    if (group) {
        res.json({ message: 'group was successfully added' });
    } else {
        res.status(400).json({ message: 'this group name is already existed' });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { name, permissions } = req.body;
    const groupServiceInstance = new GroupService(GroupModel);
    const user = await groupServiceInstance.updateItem({ id, name, permissions });
    if (user) {
        res.json({ message: 'group was successfully updated' });
    } else {
        res.status(404).json({ message: 'not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const groupServiceInstance = new GroupService(GroupModel);
    await groupServiceInstance.deleteItem(id);
    res.json({ message: 'group was successfully deleted' });
});

export default router;
