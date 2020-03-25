import { logger } from '../../src/helpers/loggerHelper';
import GroupService from '../../src/services/groupService';
import {
    getAllgroups,
    getGroupById,
    addNewGroup,
    updateGroup,
    deleteGroup
} from '../../src/routers/contollers/groupController';

jest.mock('../../src/services/groupService');

describe('groupContoller', () => {
    beforeEach(() => {
        GroupService.mockClear();
    });

    describe('getAllgroups', () => {
        it('should successfully return array with groups', async () => {
            const data = [{ id:'some_group_id_1' }, { id:'some_group_id_2' }];
            const resSpy = {
                json: jest.fn()
            };
            GroupService.prototype.getAllItems.mockReturnValueOnce(Promise.resolve(data));

            await getAllgroups(null, resSpy);

            expect(GroupService.prototype.getAllItems).toHaveBeenCalled();
            expect(GroupService.prototype.getAllItems.mock.calls.length).toBe(1);
            expect(resSpy.json).toHaveBeenCalledWith(data);

            GroupService.prototype.getAllItems.mockClear();
        });

        it('should handle catch block', async () => {
            const expectedError = new Error('test error');
            const nextStub = jest.fn();
            GroupService.prototype.getAllItems.mockReturnValueOnce(Promise.reject(expectedError));
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await getAllgroups(null, null, nextStub);

            expect(GroupService.prototype.getAllItems).toHaveBeenCalled();
            expect(GroupService.prototype.getAllItems.mock.calls.length).toBe(1);
            expect(logStub).toHaveBeenCalledWith('error', 'GroupService.getAllItems was called with following arguments are undefined, error message: test error');
            expect(nextStub).toHaveBeenCalledWith(expectedError);

            logStub.mockRestore();
            GroupService.prototype.getAllItems.mockClear();
        });
    });

    describe('getGroupById', () => {
        const id = 'some_group_id_1';

        it('should successfully return group', async () => {
            const data = { id };
            const resSpy = {
                json: jest.fn()
            };
            GroupService.prototype.getItemById.mockReturnValueOnce(Promise.resolve(data));

            await getGroupById({ params: { id } }, resSpy);

            expect(GroupService.prototype.getItemById).toHaveBeenCalledWith({ id });
            expect(resSpy.json).toHaveBeenCalledWith(data);

            GroupService.prototype.getItemById.mockClear();
        });

        it('should return 404 -"group not found"', async () => {
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };
            GroupService.prototype.getItemById.mockReturnValueOnce(Promise.resolve(null));

            await getGroupById({ params: { id } }, resSpy);

            expect(GroupService.prototype.getItemById).toHaveBeenCalledWith({ id });
            expect(resSpy.status).toHaveBeenCalledWith(404);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'group not found' });

            GroupService.prototype.getItemById.mockClear();
        });

        it('should handle error', async () => {
            const expectedError = new Error('test error');
            const nextSpy = jest.fn();
            GroupService.prototype.getItemById.mockReturnValueOnce(Promise.reject(expectedError));
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await getGroupById({ params: { id } }, null, nextSpy);

            expect(GroupService.prototype.getItemById).toHaveBeenCalledWith({ id });
            expect(logStub).toHaveBeenCalledWith('error', 'GroupService.getItemById was called with following arguments are {\"id\":\"some_group_id_1\"}, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);

            logStub.mockClear();
            GroupService.prototype.getItemById.mockClear();
        });
    });

    describe('addNewGroup', () => {
        const body = {
            name: 'test group',
            permissions: ['READ', 'WRITE']
        };

        it('should successfully add new group', async () => {
            const id = 'some_group_id_1';
            const resSpy = {
                json: jest.fn()
            };
            GroupService.prototype.addItem.mockReturnValueOnce(Promise.resolve({ ...body, id }));

            await addNewGroup({ body }, resSpy);

            expect(GroupService.prototype.addItem).toHaveBeenCalledWith(body);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'group was successfully added' });

            GroupService.prototype.addItem.mockClear();
        });

        it('should return 400 -"this group name is already existed"', async () => {
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };
            GroupService.prototype.addItem.mockReturnValueOnce(Promise.resolve(null));

            await addNewGroup({ body }, resSpy);

            expect(GroupService.prototype.addItem).toHaveBeenCalledWith(body);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'this group name is already existed' });

            GroupService.prototype.addItem.mockClear();
        });

        it('should handle error', async () => {
            const expectedError = new Error('test error');
            const nextSpy = jest.fn();
            GroupService.prototype.addItem.mockReturnValueOnce(Promise.reject(expectedError));
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await addNewGroup({ body }, null, nextSpy);

            expect(GroupService.prototype.addItem).toHaveBeenCalledWith(body);
            expect(logStub).toHaveBeenCalledWith('error', 'GroupService.addItem was called with following arguments are {\"name\":\"test group\",\"permissions\":[\"READ\",\"WRITE\"]}, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);

            logStub.mockClear();
            GroupService.prototype.addItem.mockClear();
        });
    });

    describe('updateGroup', () => {
        const id = 'some_group_id_1';
        const body = {
            name: 'test group',
            permissions: ['READ', 'WRITE']
        };

        it('should successfully update group', async () => {
            const data = { id, ...body };
            const resSpy = {
                json: jest.fn()
            };
            GroupService.prototype.updateItem.mockReturnValueOnce(Promise.resolve(data));

            await updateGroup({ params: { id }, body }, resSpy);

            expect(GroupService.prototype.updateItem).toHaveBeenCalledWith(data);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'group was successfully updated' });

            GroupService.prototype.updateItem.mockClear();
        });

        it('should return 404 -"not found"', async () => {
            const data = { id, ...body };
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };
            GroupService.prototype.updateItem.mockReturnValueOnce(Promise.resolve(null));

            await updateGroup({ params: { id }, body }, resSpy);

            expect(GroupService.prototype.updateItem).toHaveBeenCalledWith(data);
            expect(resSpy.status).toHaveBeenCalledWith(404);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'not found' });

            GroupService.prototype.updateItem.mockClear();
        });

        it('should handle error', async () => {
            const data = { id, ...body };
            const expectedError = new Error('test error');
            const nextSpy = jest.fn();
            GroupService.prototype.updateItem.mockReturnValueOnce(Promise.reject(expectedError));
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await updateGroup({ params: { id }, body }, null, nextSpy);

            expect(GroupService.prototype.updateItem).toHaveBeenCalledWith(data);
            expect(logStub).toHaveBeenCalledWith('error', 'GroupService.updateItem was called with following arguments are {\"id\":\"some_group_id_1\",\"name\":\"test group\",\"permissions\":[\"READ\",\"WRITE\"]}, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);

            logStub.mockClear();
            GroupService.prototype.updateItem.mockClear();
        });
    });

    describe('deleteGroup', () => {
        const id = 'some_group_id_1';

        it('should successfully delete group', async () => {
            const data = { id };
            const resSpy = {
                json: jest.fn()
            };
            GroupService.prototype.deleteItem.mockReturnValueOnce(Promise.resolve(data));

            await deleteGroup({ params: { id } }, resSpy);

            expect(GroupService.prototype.deleteItem).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'Group was successfully deleted' });

            GroupService.prototype.deleteItem.mockClear();
        });

        it('should return "This group does not exist"', async () => {
            const resSpy = {
                json: jest.fn()
            };
            GroupService.prototype.deleteItem.mockReturnValueOnce(Promise.resolve(null));

            await deleteGroup({ params: { id } }, resSpy);

            expect(GroupService.prototype.deleteItem).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'This group does not exist' });

            GroupService.prototype.deleteItem.mockClear();
        });

        it('should handle error', async () => {
            const expectedError = new Error('test error');
            const nextSpy = jest.fn();
            GroupService.prototype.deleteItem.mockReturnValueOnce(Promise.reject(expectedError));
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await deleteGroup({ params: { id } }, null, nextSpy);

            expect(GroupService.prototype.deleteItem).toHaveBeenCalledWith(id);
            expect(logStub).toHaveBeenCalledWith('error', 'GroupService.deleteItem was called with following arguments are {\"id\":\"some_group_id_1\"}, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);

            logStub.mockClear();
            GroupService.prototype.deleteItem.mockClear();
        });
    });
});
