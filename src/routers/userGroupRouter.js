import { Router } from 'express';
import UserGroupModel from '../Models/userGroupModel';
import GroupModel from '../Models/groupModel';
import UserModel from '../Models/userModel';
import UserGroupService from '../services/userGroupService';
import UserService from '../services/userService';
import GroupService from '../services/groupService';

const router = Router();

router.get('/', async (req, res) => {
    const userGroupServiceInstance = new UserGroupService({ model: UserGroupModel });
    const userGroup = await userGroupServiceInstance.getAllItems();

    res.json(userGroup);
});

router.post('/', async (req, res) => {
    const { groupId, userIds } = req.body;
    const userGroupServiceInstance = new UserGroupService({
        model: UserGroupModel,
        userService: new UserService(UserModel),
        groupService: new GroupService(GroupModel)
    });

    const userGroupAdded  = await userGroupServiceInstance.addUsersToGroup({ groupId, userIds });

    if (userGroupAdded) {
        res.json({ message: 'users were successfully added to the group' });
    } else {
        res.status(404).json({ message: 'not found' });
    }
});

export default router;
