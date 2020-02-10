import { Router } from 'express';
import UserGroupModel from '../Models/userGroupModel';
import UserGroupService from '../services/userGroupService';

const router = Router();

router.get('/', async (req, res) => {
    const userGroupServiceInstance = new UserGroupService(UserGroupModel);
    const userGroup = await userGroupServiceInstance.getAllItems();

    res.json(userGroup);
});

export default router;
