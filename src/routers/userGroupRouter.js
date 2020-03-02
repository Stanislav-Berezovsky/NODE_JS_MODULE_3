import { Router } from 'express';
import UserGroupModel from '../Models/userGroupModel';
import GroupModel from '../Models/groupModel';
import UserModel from '../Models/userModel';
import UserGroupService from '../services/userGroupService';
import UserService from '../services/userService';
import GroupService from '../services/groupService';
import loggerMiddleware from './loggerMiddleware';
import { logServiceError } from '../helpers/loggerHelper';

const router = Router();

router.get('/',
    loggerMiddleware({ serviceName:'UserGroupService', method: 'getAllItems' }),
    async (req, res) => {
        const userGroupServiceInstance = new UserGroupService({ model: UserGroupModel });
        try {
            const userGroup = await userGroupServiceInstance.getAllItems();

            res.json(userGroup);
        } catch (e) {
            logServiceError({ name: 'UserGroupService', method:'getAllItems', errorMessage: e.message });
        }
    });

router.post('/',
    loggerMiddleware({ serviceName:'UserGroupService', method: 'addUsersToGroup' }),
    async (req, res) => {
        const { groupId, userIds } = req.body;
        const userGroupServiceInstance = new UserGroupService({
            model: UserGroupModel,
            userService: new UserService(UserModel),
            groupService: new GroupService(GroupModel)
        });

        const params = { groupId, userIds };
        try {
            const userGroupAdded  = await userGroupServiceInstance.addUsersToGroup(params);

            if (userGroupAdded) {
                res.json({ message: 'users were successfully added to the group' });
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } catch (e) {
            logServiceError({ name: 'UserGroupService', method:'getAllItems', errorMessage: e.message, params });
        }
    });

export default router;
