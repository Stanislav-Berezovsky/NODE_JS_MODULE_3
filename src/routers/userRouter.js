import { Router } from 'express';
import validate from './validators/validator';
import { userSchema } from './validators/userSchema';
import loggerMiddleware from './loggerMiddleware';
import authentication from './authenticationMiddleware';
import {
    getAllUsers,
    getUserById,
    autoSuggestUsers,
    addNewUser,
    updateUser,
    deleteUser
} from './contollers/userController';

const router = Router();

router.get('/autoSuggest',
    authentication,
    loggerMiddleware({ serviceName:'UserService', method: 'getAutosuggested' }),
    autoSuggestUsers
);

router.get('/',
    authentication,
    loggerMiddleware({ serviceName:'UserService', method: 'getAllItems' }),
    getAllUsers
);

router.get('/:id',
    authentication,
    loggerMiddleware({ serviceName:'UserService', method: 'getItemById' }),
    getUserById
);

router.post('/',
    authentication,
    validate(userSchema),
    loggerMiddleware({ serviceName:'UserService', method: 'addItem' }),
    addNewUser
);

router.put('/:id',
    authentication,
    validate(userSchema),
    loggerMiddleware({ serviceName:'UserService', method: 'updateItem' }),
    updateUser
);

router.delete('/:id',
    authentication,
    loggerMiddleware({ serviceName:'UserService', method: 'deleteItem' }),
    deleteUser
);

export default router;
