import { Router } from 'express';
import GroupModel from '../Models/groupModel';
import GroupService from '../services/groupService';
import loggerMiddleware from './loggerMiddleware';
import { logServiceError } from '../helpers/loggerHelper';
import validate from './validators/validator';
import { groupPostSchema, groupPutSchema } from './validators/groupSchema';
import authentication from './authenticationMiddleware';

const router = Router();

router.get('/',
    authentication,
    loggerMiddleware({ serviceName:'GroupService', method: 'getAllItems' }),
    async (req, res) => {
        const groupServiceInstance = new GroupService(GroupModel);
        try {
            const groups = await groupServiceInstance.getAllItems();
            res.json(groups);
        } catch (e) {
            logServiceError({ name:'GroupService', method:'getAllItems', errorMessage: e.message });
        }
    });

router.get('/:id',
    authentication,
    loggerMiddleware({ serviceName:'GroupService', method: 'getItemById' }),
    async (req, res) => {
        const params = { id: req.params.id };
        const groupServiceInstance = new GroupService(GroupModel);

        try {
            const group = await groupServiceInstance.getItemById(params);
            if (group) {
                res.json(group);
            } else {
                res.status(404).json({ message: 'group not found' });
            }
        } catch (e) {
            logServiceError({ name:'GroupService', method:'getItemById', errorMessage: e.message, params });
        }
    });

router.post('/',
    authentication,
    validate(groupPostSchema),
    loggerMiddleware({ serviceName:'GroupService', method: 'addItem' }),
    async (req, res) => {
        const { name, permissions } = req.body;
        const params = { name, permissions };
        const groupServiceInstance = new GroupService(GroupModel);

        try {
            const group = await groupServiceInstance.addItem(params);
            if (group) {
                res.json({ message: 'group was successfully added' });
            } else {
                res.status(400).json({ message: 'this group name is already existed' });
            }
        } catch (e) {
            logServiceError({ name:'GroupService', method:'addItem', errorMessage: e.message, params });
        }
    });

router.put('/:id',
    authentication,
    validate(groupPutSchema),
    loggerMiddleware({ serviceName:'GroupService', method: 'updateItem' }),
    async (req, res) => {
        const id = req.params.id;
        const { name, permissions } = req.body;
        const params = { id, name, permissions };
        const groupServiceInstance = new GroupService(GroupModel);

        try {
            const user = await groupServiceInstance.updateItem(params);
            if (user) {
                res.json({ message: 'group was successfully updated' });
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } catch (e) {
            logServiceError({ name:'GroupService', method:'updateItem', errorMessage: e.message, params });
        }
    });

router.delete('/:id',
    authentication,
    loggerMiddleware({ serviceName:'GroupService', method: 'deleteItem' }),
    async (req, res) => {
        const id = req.params.id;
        const groupServiceInstance = new GroupService(GroupModel);

        try {
            await groupServiceInstance.deleteItem(id);
            res.json({ message: 'group was successfully deleted' });
        } catch (e) {
            logServiceError({ name:'GroupService', method:'deleteItem', errorMessage: e.message, params: { id } });
        }
    });

export default router;
