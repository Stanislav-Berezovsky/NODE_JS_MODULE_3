import GroupService from '../../services/groupService';
import GroupModel from '../../Models/groupModel';
import { logServiceError } from '../../helpers/loggerHelper';

export const getAllgroups = async (req, res, next) => {
    const groupServiceInstance = new GroupService(GroupModel);
    try {
        const groups = await groupServiceInstance.getAllItems();
        res.json(groups);
    } catch (e) {
        logServiceError({ name:'GroupService', method:'getAllItems', errorMessage: e.message });
        // eslint-disable-next-line
        next(e);
    }
};

export const getGroupById = async (req, res, next) => {
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
        // eslint-disable-next-line
        next(e);
    }
};

export const addNewGroup = async (req, res, next) => {
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
        // eslint-disable-next-line
        next(e);
    }
};

export const updateGroup = async (req, res, next) => {
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
        // eslint-disable-next-line
        next(e);
    }
};

export const deleteGroup = async (req, res, next) => {
    const id = req.params.id;
    const groupServiceInstance = new GroupService(GroupModel);

    try {
        const group = await groupServiceInstance.deleteItem(id);
        if (group) {
            res.json({ message: 'Group was successfully deleted' });
        } else {
            res.json({ message: 'This group does not exist' });
        }
    } catch (e) {
        logServiceError({ name:'GroupService', method:'deleteItem', errorMessage: e.message, params: { id } });
        // eslint-disable-next-line
        next(e);
    }
};
