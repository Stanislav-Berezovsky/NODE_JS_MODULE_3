import UserService from '../../src/services/userService';
import { logger } from '../../src/helpers/loggerHelper';
import {
    getAllUsers,
    getUserById,
    autoSuggestUsers,
    addNewUser,
    updateUser,
    deleteUser
} from '../../src/routers/contollers/userController';

describe('userController', () => {
    describe('getAllItems', () => {
        test('should return data for success scenario', async () => {
            const data = [
                {
                    'id': 1,
                    'login': 'testlogin1autoSuggest',
                    'password': 'testpassword1',
                    'age': 21,
                    'isDeleted': false,
                    'createdAt': '2020-03-23T21:18:50.367Z',
                    'updatedAt': '2020-03-23T21:18:50.367Z'
                },
                {
                    'id': 2,
                    'login': 'testlogin3autoSuggest',
                    'password': 'testpassword3',
                    'age': 23,
                    'isDeleted': false,
                    'createdAt': '2020-03-23T21:18:50.367Z',
                    'updatedAt': '2020-03-23T21:18:50.367Z'
                }
            ];

            const resSpy = {
                json: jest.fn()
            };
            const getAllItemsStub = jest.spyOn(UserService.prototype, 'getAllItems')
                .mockImplementation(() => Promise.resolve(data));

            await getAllUsers(null, resSpy);

            expect(getAllItemsStub).toHaveBeenCalled();
            expect(getAllItemsStub.mock.calls.length).toBe(1);
            expect(resSpy.json).toHaveBeenCalledWith(data);
            getAllItemsStub.mockRestore();
        });


        test('should call next method to handle error', async () => {
            const expectedError = new Error('test error');
            const nextSpy = jest.fn();
            const getAllItemsStub = jest.spyOn(UserService.prototype, 'getAllItems')
                .mockImplementation(() => {
                    throw expectedError;
                });
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await getAllUsers(null, null, nextSpy);

            expect(getAllItemsStub).toHaveBeenCalled();
            expect(getAllItemsStub.mock.calls.length).toBe(1);
            expect(logStub).toHaveBeenCalledWith('error', 'UserService.getAllItems was called with following arguments are undefined, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);
            logStub.mockRestore();
            getAllItemsStub.mockRestore();
        });
    });

    describe('getUserById', () => {
        it('should return user ', async () => {
            const id = 1;
            const resSpy = {
                json: jest.fn()
            };

            const data = {
                id,
                'login': 'testlogin1autoSuggest',
                'password': 'testpassword1',
                'age': 21,
                'isDeleted': false,
                'createdAt': '2020-03-23T21:18:50.367Z',
                'updatedAt': '2020-03-23T21:18:50.367Z'
            };
            const getItemByIdStub = jest.spyOn(UserService.prototype, 'getItemById')
                .mockImplementation(() => Promise.resolve(data));

            await getUserById({ params: { id } }, resSpy);

            expect(getItemByIdStub).toHaveBeenCalledWith({ id });
            expect(resSpy.json).toHaveBeenCalledWith(data);

            getItemByIdStub.mockRestore();
        });

        it('should return 404 - "user not found" ', async () => {
            const id = 11111;
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            const getItemByIdStub = jest.spyOn(UserService.prototype, 'getItemById')
                .mockImplementation(() => Promise.resolve(null));

            await getUserById({ params: { id } }, resSpy);

            expect(getItemByIdStub).toHaveBeenCalledWith({ id });
            expect(resSpy.status).toHaveBeenCalledWith(404);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'user not found' });

            getItemByIdStub.mockRestore();
        });

        test('should call next method to handle error', async () => {
            const id = 1231233;
            const nextSpy = jest.fn();
            const expectedError = new Error('test error');
            const getItemByIdStub = jest.spyOn(UserService.prototype, 'getItemById')
                .mockImplementation(() => {
                    throw expectedError;
                });
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await getUserById({ params: { id } }, null, nextSpy);

            expect(getItemByIdStub).toHaveBeenCalledWith({ id });
            expect(logStub).toHaveBeenCalledWith('error', 'UserService.getItemById was called with following arguments are {\"id\":1231233}, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);
            logStub.mockRestore();
            getItemByIdStub.mockRestore();
        });
    });

    describe('addNewUser', () => {
        const body = {
            login: 'test_login',
            password: 'test_password',
            age: 23
        };

        it('should successfully add new user', async () => {
            const resSpy = {
                json: jest.fn()
            };
            const addItemStub = jest.spyOn(UserService.prototype, 'addItem')
                .mockImplementation(() => Promise.resolve({ ...body, id: 55 }));

            await addNewUser({  body }, resSpy);

            expect(addItemStub).toHaveBeenCalledWith(body);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'user was successfully added' });
            addItemStub.mockRestore();
        });

        it('should return 400 - "this login is already existed"', async () => {
            const resSpy = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };
            const addItemStub = jest.spyOn(UserService.prototype, 'addItem')
                .mockImplementation(() => Promise.resolve(null));

            await addNewUser({  body }, resSpy);

            expect(addItemStub).toHaveBeenCalledWith(body);
            expect(resSpy.status).toHaveBeenCalledWith(400);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'this login is already existed' });
            addItemStub.mockRestore();
        });

        it('should handle error', async () => {
            const nextSpy = jest.fn();
            const expectedError = new Error('test error');
            const addItemStub = jest.spyOn(UserService.prototype, 'addItem')
                .mockImplementation(() => {
                    throw expectedError;
                });
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await addNewUser({ body }, null, nextSpy);

            expect(addItemStub).toHaveBeenCalledWith(body);
            expect(logStub).toHaveBeenCalledWith('error', 'UserService.addItem was called with following arguments are {\"login\":\"test_login\",\"password\":\"test_password\",\"age\":23}, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);
            logStub.mockRestore();
            addItemStub.mockRestore();
        });
    });

    describe('should successfully update user', () => {
        const id = 1;
        const body = {
            login: 'test_login',
            password: 'test_password',
            age: 23
        };

        it('user successfully update user', async () => {
            const res = {
                json: jest.fn()
            };
            const updateItemStub = jest.spyOn(UserService.prototype, 'updateItem')
                .mockImplementation(() => Promise.resolve({ id, ...body }));

            await updateUser({ params: { id }, body }, res);

            expect(updateItemStub).toHaveBeenCalledWith({ id, ...body });
            expect(res.json).toHaveBeenCalledWith({ message: 'user was successfully updated' });
            updateItemStub.mockRestore();
        });

        it('should return 404 - "not found"', async () => {
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis()
            };
            const updateItemStub = jest.spyOn(UserService.prototype, 'updateItem')
                .mockImplementation(() => Promise.resolve(null));

            await updateUser({ params: { id }, body }, res);

            expect(updateItemStub).toHaveBeenCalledWith({ id, ...body });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: 'not found' });
            updateItemStub.mockRestore();
        });

        it('should handle error', async () => {
            const nextSpy = jest.fn();
            const expectedError = new Error('test error');
            const updateItemStub = jest.spyOn(UserService.prototype, 'updateItem')
                .mockImplementation(() => {
                    throw expectedError;
                });
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await updateUser({ params: { id }, body }, null, nextSpy);

            expect(updateItemStub).toHaveBeenCalledWith({ id, ...body });
            expect(logStub).toHaveBeenCalledWith('error', 'UserService.updateItem was called with following arguments are {\"id\":1,\"login\":\"test_login\",\"password\":\"test_password\",\"age\":23}, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);
            logStub.mockRestore();
            updateItemStub.mockRestore();
        });
    });

    describe('autoSuggestUsers', () => {
        it('should return autosuggested users', async () => {
            const loginSubstring = 'login_test';
            const limit = 2;
            const data = [{
                'id': 1,
                'login': 'testlogin1autoSuggest'
            },
            {
                'id': 2,
                'login': 'testlogin3autoSuggest'
            }];
            const resSpy = {
                json: jest.fn()
            };
            const getAutosuggestedStub = jest.spyOn(UserService.prototype, 'getAutosuggested')
                .mockImplementation(() => Promise.resolve(data));

            await autoSuggestUsers({ query: { loginSubstring, limit } }, resSpy);

            expect(getAutosuggestedStub).toHaveBeenCalledWith({ loginSubstring, limit });
            expect(resSpy.json).toHaveBeenCalledWith({ users:data });
            getAutosuggestedStub.mockRestore();
        });

        it('should call next method to handle error', async () => {
            const loginSubstring = 'login_test';
            const limit = 2;
            const nextSpy = jest.fn();
            const expectedError = new Error('test error');
            const getAutosuggestedStub = jest.spyOn(UserService.prototype, 'getAutosuggested')
                .mockImplementation(() => {
                    throw expectedError;
                });
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await autoSuggestUsers({ query: { loginSubstring, limit } }, null, nextSpy);

            expect(getAutosuggestedStub).toHaveBeenCalledWith({ loginSubstring, limit });
            expect(logStub).toHaveBeenCalledWith('error', 'UserService.getAutosuggested was called with following arguments are {\"loginSubstring\":\"login_test\",\"limit\":2}, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);
            logStub.mockRestore();
            getAutosuggestedStub.mockRestore();
        });
    });

    describe('deleteUser', () => {
        it('should return "user was successfully deleted"', async () => {
            const id = 1;
            const resSpy = {
                json: jest.fn()
            };

            const deleteItemStub = jest.spyOn(UserService.prototype, 'deleteItem')
                .mockImplementation(() => Promise.resolve({
                    'id': 1,
                    'login': 'testlogin1autoSuggest'
                }));

            await deleteUser({ params:{ id } }, resSpy);

            expect(deleteItemStub).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'user was successfully deleted' });
            deleteItemStub.mockRestore();
        });

        it('should return "this user does not exist"', async () => {
            const id = 1231233;
            const resSpy = {
                json: jest.fn()
            };
            const deleteItemStub = jest.spyOn(UserService.prototype, 'deleteItem')
                .mockImplementation(() => Promise.resolve(null));

            await deleteUser({ params:{ id } }, resSpy);

            expect(deleteItemStub).toHaveBeenCalledWith(id);
            expect(resSpy.json).toHaveBeenCalledWith({ message: 'This user does not exist' });
            deleteItemStub.mockRestore();
        });

        it('error should be catched', async () => {
            const id = 1231233;
            const nextSpy = jest.fn();
            const expectedError = new Error('test error');
            const deleteItemStub = jest.spyOn(UserService.prototype, 'deleteItem')
                .mockImplementation(() => {
                    throw expectedError;
                });
            const logStub = jest.spyOn(logger, 'log').mockImplementation(() => {});

            await deleteUser({ params: { id } }, null, nextSpy);

            expect(deleteItemStub).toHaveBeenCalledWith(id);
            expect(logStub).toHaveBeenCalledWith('error', 'UserService.deleteItem was called with following arguments are {\"id\":1231233}, error message: test error');
            expect(nextSpy).toHaveBeenCalledWith(expectedError);
            logStub.mockRestore();
            deleteItemStub.mockRestore();
        });
    });
});
